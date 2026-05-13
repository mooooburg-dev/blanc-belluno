import type { Category } from './portfolio';

export interface ServiceCategory {
  slug: string;
  category: Category;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlights: { title: string; description: string }[];
  color: string;
  accent: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'arch',
    category: 'ARCH',
    label: 'Arch',
    title: 'BALLOON ARCH',
    subtitle: '아치 / 반아치',
    description:
      '공간의 주인공이 되는 풍선 아치. 입구·포토존을 압도하는 풀 아치와 반아치 디자인.',
    longDescription:
      '아치와 반아치는 행사 공간의 첫인상을 결정짓는 핵심 오브제입니다. 컬러와 사이즈, 곡선을 컨셉에 맞춰 1:1 제작합니다.',
    tags: ['풀 아치', '반아치', '메인 포토존'],
    highlights: [
      {
        title: '맞춤 사이즈 제작',
        description:
          '공간 사이즈와 천장 높이에 맞춰 아치의 폭·높이·곡률을 설계합니다.',
      },
      {
        title: '컬러 팔레트 큐레이션',
        description:
          '테마와 의상·소품 컬러까지 고려한 라텍스·포일 풍선 조합 제안.',
      },
      {
        title: '안정적인 현장 설치',
        description:
          '대형 아치도 안전하게 고정·운영할 수 있도록 전문 인력이 설치합니다.',
      },
    ],
    color: 'bg-blanc-champagne/20',
    accent: 'bg-blanc-champagne',
  },
  {
    slug: 'number-tower',
    category: 'NUMBER TOWER',
    label: 'Number',
    title: 'NUMBER TOWER',
    subtitle: '숫자 타워',
    description:
      '나이·기념일 숫자를 풍선으로 표현하는 임팩트 오브제. 포토존의 시그니처가 됩니다.',
    longDescription:
      '한 자리·두 자리·세 자리 숫자 타워는 생일과 기념일의 상징입니다. 컬러와 디테일 장식으로 한 장의 사진을 작품으로 만듭니다.',
    tags: ['생일 숫자', '기념일', '포토 오브제'],
    highlights: [
      {
        title: '맞춤 숫자 디자인',
        description:
          '원하는 숫자·서체·사이즈로 1:1 제작. 단독 또는 아치와 결합 가능.',
      },
      {
        title: '디테일 데코',
        description:
          '리본·꽃·LED 등 추가 데코로 숫자 타워의 완성도를 한 단계 끌어올립니다.',
      },
      {
        title: '실내·실외 모두',
        description:
          '스튜디오·홈파티·야외 행사 어디서나 안정적으로 세팅 가능한 구조.',
      },
    ],
    color: 'bg-blanc-blush-light',
    accent: 'bg-blanc-blush',
  },
  {
    slug: 'dol',
    category: 'DOL',
    label: 'Dol',
    title: 'FIRST BIRTHDAY',
    subtitle: '돌잔치',
    description:
      '평생 한 번뿐인 첫 생일. 돌상·포토월·메인 무대까지 우아하게 완성합니다.',
    longDescription:
      '돌잔치는 가족과 친지가 함께 기억하는 소중한 자리입니다. 부드러운 톤과 정제된 소재로 사진 한 장까지 완성도 있게 연출합니다.',
    tags: ['돌상', '포토월', '백드롭'],
    highlights: [
      {
        title: '돌상 & 포토월',
        description:
          '돌상 주변과 포토월을 한 톤으로 연결하는 정제된 백드롭 연출.',
      },
      {
        title: '파스텔·내추럴 무드',
        description:
          '아기 사진과 자연스럽게 어우러지는 파스텔·내추럴 컬러 팔레트.',
      },
      {
        title: '풀 코디 패키지',
        description:
          '풍선·플라워·소품까지 한 컨셉으로 통일된 코디네이션을 제공합니다.',
      },
    ],
    color: 'bg-blanc-blush-light',
    accent: 'bg-blanc-rose',
  },
  {
    slug: 'senior',
    category: 'SENIOR',
    label: 'Senior',
    title: 'SENIOR BIRTHDAY',
    subtitle: '생신연 · 회갑 · 칠순',
    description:
      '부모님·조부모님을 위한 품격 있는 생신연. 가족 모두가 오래 기억할 자리.',
    longDescription:
      '환갑·칠순·팔순까지, 어른의 격에 어울리는 차분하고 단정한 무드로 자리를 빛냅니다. 가족 사진이 작품처럼 남도록 디자인합니다.',
    tags: ['회갑', '칠순', '팔순', '가족 행사'],
    highlights: [
      {
        title: '품격 있는 컬러 팔레트',
        description:
          '샴페인·골드·우드 톤 등 어른의 격에 어울리는 차분한 컬러 구성.',
      },
      {
        title: '메인 무대 백드롭',
        description:
          '인사말·헌화·가족 사진을 위한 메인 무대 백드롭과 포토존 설계.',
      },
      {
        title: '연회장 맞춤 세팅',
        description:
          '호텔·연회장·식당의 구조와 사이즈에 맞춘 현장 답사·설치 진행.',
      },
    ],
    color: 'bg-blanc-champagne/30',
    accent: 'bg-blanc-champagne',
  },
  {
    slug: 'corporate',
    category: 'CORPORATE',
    label: 'Corporate',
    title: 'CORPORATE EVENTS',
    subtitle: '기업 행사',
    description:
      '브랜드 아이덴티티를 돋보이게 하는 프로페셔널 공간 연출. 론칭·팝업·VIP 행사.',
    longDescription:
      '브랜드의 메시지가 공간으로 전달되도록 컬러·소재·구조를 통일감 있게 디자인합니다. 사전 답사부터 철수까지 함께합니다.',
    tags: ['론칭 파티', '팝업스토어', '사내 행사'],
    highlights: [
      {
        title: '브랜드 컬러 매칭',
        description:
          'Pantone·CMYK 기준의 정확한 브랜드 컬러 매칭 풍선 제작·연출.',
      },
      {
        title: '대형 구조물 연출',
        description:
          '포토월·천장 클러스터·로고 오브제 등 대규모 행사용 구조 디자인.',
      },
      {
        title: '현장 운영 패키지',
        description:
          '사전 답사, 현장 설치·철수, 행사 중 유지보수까지 원스톱 진행.',
      },
    ],
    color: 'bg-white',
    accent: 'bg-blanc-gold/10',
  },
  {
    slug: 'party',
    category: 'PARTY',
    label: 'Party',
    title: 'PRIVATE PARTY',
    subtitle: '파티',
    description:
      '홈파티부터 키즈 파티까지. 작은 공간도 특별하게 만드는 프라이빗 풍선 연출.',
    longDescription:
      '생일·기념일·시즌 파티 등 모든 프라이빗 파티에 어울리는 컬러와 톤을 제안합니다. 작은 디테일까지 사진에 담기도록 구성합니다.',
    tags: ['홈파티', '키즈 파티', '서프라이즈'],
    highlights: [
      {
        title: '맞춤 컬러 큐레이션',
        description:
          '테마와 무드에 맞는 풍선 컬러 팔레트를 1:1로 큐레이션하여 제안합니다.',
      },
      {
        title: '포토존 & 가랜드',
        description:
          '메인 포토존, 케이크 테이블 가랜드, 천장 풍선까지 공간 전체를 연출합니다.',
      },
      {
        title: '서프라이즈 연출',
        description:
          '풍선 드롭·리빌 등 이벤트 타이밍에 맞춘 서프라이즈 디렉팅 가능.',
      },
    ],
    color: 'bg-blanc-blush-light',
    accent: 'bg-blanc-blush',
  },
  {
    slug: 'school',
    category: 'SCHOOL',
    label: 'School',
    title: 'GRADUATION & ADMISSION',
    subtitle: '졸업 / 입학식',
    description:
      '학교의 의미 있는 시작과 마무리. 졸업·입학식 무대와 포토존을 책임집니다.',
    longDescription:
      '학생과 가족에게 평생 남는 한 장면을 위해, 학교의 컬러와 분위기에 맞춘 무대·포토존을 디자인합니다.',
    tags: ['졸업식', '입학식', '학교 행사'],
    highlights: [
      {
        title: '학교 컬러 매칭',
        description:
          '교복·상징색·로고 컬러에 맞춘 풍선 조합으로 통일감 있는 연출.',
      },
      {
        title: '메인 무대 & 포토존',
        description:
          '강당 무대 백드롭부터 학생·가족용 포토존까지 전체 구성.',
      },
      {
        title: '대규모 인원 대응',
        description:
          '많은 인원이 한 번에 사진을 찍을 수 있는 와이드 포토존 설계 가능.',
      },
    ],
    color: 'bg-blanc-base',
    accent: 'bg-blanc-sand/30',
  },
  {
    slug: 'wedding',
    category: 'WEDDING',
    label: 'Wedding',
    title: 'WEDDING & PROPOSAL',
    subtitle: '웨딩 / 프로포즈',
    description:
      '인생의 가장 아름다운 순간을 위한 하이엔드 풍선 장식. 웨딩홀부터 프로포즈까지.',
    longDescription:
      '공간의 격을 높이는 절제된 컬러와 소재 선택으로, 웨딩과 프로포즈의 모든 순간을 작품처럼 완성합니다.',
    tags: ['웨딩홀', '프로포즈', '버진로드'],
    highlights: [
      {
        title: '웨딩홀 메인 아치',
        description:
          '예식장 입구·버진로드·메인 무대를 위한 대형 풍선 아치 디자인.',
      },
      {
        title: '프로포즈 시크릿 셋업',
        description:
          '서프라이즈 프로포즈 공간을 위한 컴팩트하고 로맨틱한 풍선 데코.',
      },
      {
        title: '고급 소재 사용',
        description:
          '샴페인·펄·무광 라텍스 등 하이엔드 소재로 사진까지 완성도 있게.',
      },
    ],
    color: 'bg-blanc-champagne/20',
    accent: 'bg-blanc-champagne',
  },
];

export function getServiceCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}
