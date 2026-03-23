"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";

interface Story {
  id: string;
  mediaUrl: string;
  mediaType: "IMAGE" | "VIDEO";
  timestamp: string;
}

const STORY_DURATION = 5000;
const VIDEO_DURATION = 15000;

export default function StoryViewer({
  isOpen,
  onClose,
  stories: rawStories,
}: {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
}) {
  const stories = useMemo(() => [...rawStories].reverse(), [rawStories]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // 모든 타이머 상태를 ref로 관리하여 리렌더 사이클과 분리
  const rafRef = useRef(0);
  const timerStartRef = useRef(0);
  const savedElapsedRef = useRef(0);
  const isTouchRef = useRef(false);
  const touchStartRef = useRef(0);
  const generationRef = useRef(0); // goTo 호출마다 증가, stale setProgress 방지

  // 최신 값을 ref로 유지 (rAF 콜백에서 참조)
  const currentIndexRef = useRef(currentIndex);
  const storiesLenRef = useRef(stories.length);
  const onCloseRef = useRef(onClose);

  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { storiesLenRef.current = stories.length; }, [stories.length]);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  // --- 핵심 함수들 ---

  const stopAnimation = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  // 스토리 이동 — 한 곳에서만 상태 변경
  const goTo = useCallback((index: number) => {
    stopAnimation();
    generationRef.current += 1;
    savedElapsedRef.current = 0;
    timerStartRef.current = 0;
    setProgress(0);
    setMediaLoaded(false);
    setPaused(false);
    setCurrentIndex(index);
  }, [stopAnimation]);

  const goNext = useCallback(() => {
    const next = currentIndexRef.current + 1;
    if (next < storiesLenRef.current) {
      goTo(next);
    } else {
      stopAnimation();
      goTo(0);
      onCloseRef.current();
    }
  }, [goTo, stopAnimation]);

  const goPrev = useCallback(() => {
    const prev = currentIndexRef.current - 1;
    goTo(prev >= 0 ? prev : 0);
  }, [goTo]);

  // --- 타이머 ---

  useEffect(() => {
    if (!isOpen || paused || !mediaLoaded || stories.length === 0) return;

    const story = stories[currentIndex];
    if (!story) return;

    const duration = story.mediaType === "VIDEO" ? VIDEO_DURATION : STORY_DURATION;
    const startTime = performance.now() - savedElapsedRef.current;
    timerStartRef.current = startTime;

    const gen = generationRef.current;

    const tick = (now: number) => {
      // goTo가 호출되었으면 이 tick 체인은 무효
      if (gen !== generationRef.current) return;

      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      if (pct >= 1) {
        goNext();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, currentIndex, paused, mediaLoaded, stories, goNext]);

  // 키보드
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { goTo(0); onCloseRef.current(); }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, goNext, goPrev, goTo]);

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // 프리로딩
  useEffect(() => {
    if (!isOpen || stories.length === 0) return;
    for (let i = 1; i <= 2; i++) {
      const idx = currentIndex + i;
      if (idx < stories.length && stories[idx].mediaType === "IMAGE") {
        const img = new window.Image();
        img.src = stories[idx].mediaUrl;
      }
    }
  }, [isOpen, currentIndex, stories]);

  // --- 렌더 ---

  if (!isOpen || stories.length === 0) return null;

  const currentStory = stories[currentIndex];
  if (!currentStory) return null;

  const timeAgo = getTimeAgo(new Date(currentStory.timestamp));

  // pause/resume — ref만 업데이트하고 state 1번만 변경
  const doPause = () => {
    savedElapsedRef.current = performance.now() - timerStartRef.current;
    setPaused(true);
  };

  const doResume = () => {
    setPaused(false);
  };

  // PC: mousedown → pause, 어디서든 mouseup → resume
  const onMouseDown = () => {
    doPause();
    const onUp = () => {
      doResume();
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mouseup", onUp);
  };

  // 모바일 터치
  const onTouchStart = () => {
    isTouchRef.current = true;
    touchStartRef.current = performance.now();
    doPause();
  };

  const onTouchEnd = (side: "left" | "right") => {
    const duration = performance.now() - touchStartRef.current;
    if (duration < 200) {
      // 짧은 탭 → 이동 (resume 불필요, goTo가 paused를 false로 리셋)
      side === "left" ? goPrev() : goNext();
    } else {
      // 롱프레스 해제 → 재개
      doResume();
    }
  };

  // PC 클릭 (터치 디바이스에서는 무시)
  const onClick = (side: "left" | "right") => {
    if (isTouchRef.current) {
      isTouchRef.current = false;
      return;
    }
    side === "left" ? goPrev() : goNext();
  };

  const handleClose = () => {
    goTo(0);
    onCloseRef.current();
  };

  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full h-full max-w-[420px] max-h-[90vh] mx-auto flex flex-col">
        {/* 진행 바 + 프로필 + 닫기 */}
        <div className="relative z-20 px-3 pt-3">
          <div className="flex gap-1 pb-2">
            {stories.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[2px] bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width:
                      i < currentIndex
                        ? "100%"
                        : i === currentIndex
                          ? `${progress * 100}%`
                          : "0%",
                    transition: "none",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2.5 pb-2">
            <Image
              src="/blanc_belluno_logo.jpg"
              alt="Blanc Belluno"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white text-xs font-medium tracking-wide">
              blancbelluno
            </span>
            <span className="text-white/50 text-xs">{timeAgo}</span>
            <button
              onClick={handleClose}
              className="ml-auto p-2 -mr-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 미디어 */}
        <div className="relative flex-1 overflow-hidden rounded-sm bg-black">
          {!mediaLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-5">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {currentStory.mediaType === "VIDEO" ? (
            <video
              key={currentStory.id}
              src={currentStory.mediaUrl}
              className={`w-full h-full object-contain transition-opacity duration-200 ${mediaLoaded ? "opacity-100" : "opacity-0"}`}
              autoPlay
              muted
              playsInline
              onLoadedData={() => setMediaLoaded(true)}
            />
          ) : (
            <Image
              key={currentStory.id}
              src={currentStory.mediaUrl}
              alt="Story"
              fill
              className={`object-contain transition-opacity duration-200 ${mediaLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="420px"
              priority
              onLoad={() => setMediaLoaded(true)}
            />
          )}

          {/* 좌측 탭 */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={() => onClick("left")}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchEnd={() => onTouchEnd("left")}
          />
          {/* 우측 탭 */}
          <div
            className="absolute right-0 top-0 w-2/3 h-full z-10 cursor-pointer"
            onClick={() => onClick("right")}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchEnd={() => onTouchEnd("right")}
          />
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}분 전`;
  }
  return `${hours}시간 전`;
}
