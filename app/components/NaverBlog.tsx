import Image from 'next/image';
import { getNaverBlogPosts } from '@/lib/naver-blog';

export default async function NaverBlog({ blogUrl }: { blogUrl: string }) {
  const posts = await getNaverBlogPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section-padding bg-blanc-base">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-blanc-gold block mb-4">
            Blog
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-blanc-text-primary tracking-tight mb-5">
            블랑벨루노{' '}
            <span className="text-blanc-text-secondary">이야기</span>
          </h2>
          <div className="divider-gold" />
          <p className="font-body text-sm md:text-base mt-5 text-blanc-text-secondary font-light">
            정성을 담은 블랑벨루노의 작업 이야기를 만나보세요.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-blanc-blush-light mb-4">
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-blanc-blush-light to-blanc-champagne">
                    <span className="font-display text-[9px] tracking-[0.2em] text-blanc-text-muted/50 uppercase">
                      Blog Post
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-blanc-text-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Date */}
              <p className="font-body text-[11px] tracking-[0.05em] text-blanc-text-muted mb-2">
                {formatDate(post.pubDate)}
              </p>

              {/* Title */}
              <h3 className="font-body text-sm md:text-[15px] font-normal leading-relaxed text-blanc-text-primary group-hover:text-blanc-text-secondary transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
            </a>
          ))}
        </div>

        {/* Blog CTA */}
        {blogUrl && (
          <div className="text-center mt-10">
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex gap-2 px-10"
            >
              <NaverBlogIcon size={14} />
              블로그 더보기
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  } catch {
    return '';
  }
}

function NaverBlogIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
    </svg>
  );
}
