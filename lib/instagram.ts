import { supabase } from './supabase';

export interface InstagramPost {
  id: string;
  caption?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

const INSTAGRAM_GRAPH_API = "https://graph.instagram.com";

async function getAccessToken(): Promise<string | null> {
  if (supabase) {
    const { data } = await supabase
      .from('belluno_settings')
      .select('value')
      .eq('key', 'instagramAccessToken')
      .single();
    if (data?.value) return data.value;
  }
  return process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

export async function saveAccessToken(token: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase
    .from('belluno_settings')
    .upsert(
      { key: 'instagramAccessToken', value: token, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );
  return !error;
}

export async function getInstagramFeed(
  count: number = 6
): Promise<InstagramPost[]> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.warn("INSTAGRAM_ACCESS_TOKEN이 설정되지 않았습니다.");
    return [];
  }

  try {
    const fields = "id,caption,media_url,thumbnail_url,permalink,media_type,timestamp";
    const url = `${INSTAGRAM_GRAPH_API}/me/media?fields=${fields}&limit=${count}&access_token=${accessToken}`;

    // Instagram CDN URL은 짧은 수명의 signed URL이라 캐시를 길게 잡으면 403이 자주 발생함
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Instagram API 에러:", error);
      return [];
    }

    const data = await res.json();

    return (data.data || []).map(
      (post: Record<string, string>): InstagramPost => ({
        id: post.id,
        caption: post.caption,
        mediaUrl: post.media_url,
        thumbnailUrl: post.thumbnail_url,
        permalink: post.permalink,
        mediaType: post.media_type as InstagramPost["mediaType"],
        timestamp: post.timestamp,
      })
    );
  } catch (error) {
    console.error("Instagram 피드 가져오기 실패:", error);
    return [];
  }
}

export interface InstagramStory {
  id: string;
  mediaUrl: string;
  mediaType: "IMAGE" | "VIDEO";
  timestamp: string;
}

export async function getInstagramStories(): Promise<InstagramStory[]> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.warn("INSTAGRAM_ACCESS_TOKEN이 설정되지 않았습니다.");
    return [];
  }

  try {
    // 1. 사용자 ID 가져오기
    const meRes = await fetch(
      `${INSTAGRAM_GRAPH_API}/me?fields=id&access_token=${accessToken}`,
      { next: { revalidate: 3600 } }
    );
    if (!meRes.ok) return [];
    const meData = await meRes.json();
    const userId = meData.id;

    // 2. 스토리 목록 가져오기
    const storiesRes = await fetch(
      `${INSTAGRAM_GRAPH_API}/${userId}/stories?fields=id,media_url,media_type,timestamp&access_token=${accessToken}`,
      { next: { revalidate: 300 } }
    );

    if (!storiesRes.ok) {
      const error = await storiesRes.json().catch(() => ({}));
      console.error("Instagram Stories API 에러:", error);
      return [];
    }

    const data = await storiesRes.json();

    return (data.data || []).map(
      (story: Record<string, string>): InstagramStory => ({
        id: story.id,
        mediaUrl: story.media_url,
        mediaType: story.media_type as InstagramStory["mediaType"],
        timestamp: story.timestamp,
      })
    );
  } catch (error) {
    console.error("Instagram 스토리 가져오기 실패:", error);
    return [];
  }
}

export async function refreshLongLivedToken(): Promise<string | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const url = `${INSTAGRAM_GRAPH_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;
    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error('Instagram 토큰 갱신 실패:', error);
      return null;
    }

    const data = await res.json();
    const newToken = data.access_token;
    if (!newToken) return null;

    await saveAccessToken(newToken);
    console.log('Instagram 토큰 갱신 완료, 만료:', data.expires_in ? `${Math.round(data.expires_in / 86400)}일 후` : '알 수 없음');
    return newToken;
  } catch (error) {
    console.error('Instagram 토큰 갱신 중 오류:', error);
    return null;
  }
}
