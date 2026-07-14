export interface NaverBlogPost {
  title: string;
  link: string;
  thumbnail: string | null;
  pubDate: string;
}

const BLOG_ID = 'lms2sky';

export async function getNaverBlogPosts(
  count: number = 3
): Promise<NaverBlogPost[]> {
  try {
    const res = await fetch(`https://rss.blog.naver.com/${BLOG_ID}.xml`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g);

    if (!items) return [];

    return items.slice(0, count).map((item) => {
      const title = extractCDATA(item, 'title') || '';
      const link = extractCDATA(item, 'link') || '';
      const description = extractCDATA(item, 'description') || '';
      const pubDate = extractTag(item, 'pubDate') || '';

      const imgMatch = description.match(/src="([^"]+)"/);
      let thumbnail = imgMatch?.[1] || null;
      if (thumbnail) {
        thumbnail = thumbnail.replace(/\?type=\w+/, '?type=w2');
      }

      return {
        title,
        link: link.replace(/\?fromRss.*$/, ''),
        thumbnail,
        pubDate,
      };
    });
  } catch (error) {
    console.error('네이버 블로그 피드 가져오기 실패:', error);
    return [];
  }
}

function extractCDATA(xml: string, tag: string): string | null {
  const match = xml.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  );
  return match?.[1] || null;
}

function extractTag(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1]?.trim() || null;
}
