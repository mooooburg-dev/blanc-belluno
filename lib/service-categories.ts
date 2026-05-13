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
    slug: 'party',
    category: 'PARTY',
    label: 'Party',
    title: 'BIRTHDAY PARTY',
    subtitle: '생일파티',
    description:
      '아이부터 어른까지, 생애 가장 특별한 날을 완성하는 프라이빗 풍선 아치와 가랜드 연출.',
    longDescription:
      '단 하루의 생일을 평생 기억할 장면으로 만들어 드립니다. 컬러 팔레트부터 포토존, 테이블 세팅까지 손님과 호스트 모두를 위한 디테일에 집중합니다.',
    tags: ['키즈 파티', '어른 생일', '서프라이즈'],
    highlights: [
      {
        title: '맞춤 컬러 큐레이션',
        description:
          '테마와 무드에 맞는 풍선 컬러 팔레트를 1:1로 큐레이션하여 제안합니다.',
      },
      {
        title: '포토존 & 가랜드',
        description:
          '메인 포토존 아치, 케이크 테이블 가랜드, 천장 풍선까지 공간 전체를 연출합니다.',
      },
      {
        title: '서프라이즈 연출',
        description:
          '이벤트 타이밍에 맞춘 서프라이즈 풍선 드롭, 가랜드 리빌까지 디렉팅 가능합니다.',
      },
    ],
    color: 'bg-blanc-blush-light',
    accent: 'bg-blanc-blush',
  },
  {
    slug: 'wedding',
    category: 'WEDDING',
    label: 'Wedding',
    title: 'WEDDING & DOL',
    subtitle: '웨딩 & 돌잔치',
    description:
      '인생의 가장 아름다운 순간을 위한 하이엔드 풍선 장식. 포토존부터 메인 무대까지 섬세한 터치.',
    longDescription:
      '웨딩과 돌잔치는 가족과 친지 모두에게 평생 남는 기억입니다. 공간의 격을 높이는 절제된 컬러와 소재 선택으로, 사진 한 장까지 작품처럼 완성합니다.',
    tags: ['웨딩홀', '포토존', '돌상 세팅'],
    highlights: [
      {
        title: '웨딩홀 메인 아치',
        description:
          '예식장 입구·버진로드·메인 무대를 위한 대형 풍선 아치 디자인.',
      },
      {
        title: '돌상 & 백드롭',
        description:
          '돌상 주변과 포토월을 한 톤으로 연결하는 정제된 백드롭 연출.',
      },
      {
        title: '고급 소재 사용',
        description:
          '샴페인, 펄, 무광 라텍스 등 하이엔드 소재로 사진에 그대로 담기는 완성도.',
      },
    ],
    color: 'bg-blanc-champagne/20',
    accent: 'bg-blanc-champagne',
  },
  {
    slug: 'baby-shower',
    category: 'BABY SHOWER',
    label: 'Baby',
    title: 'BABY SHOWER',
    subtitle: '베이비샤워',
    description:
      '새 생명의 탄생을 축복하는 우아한 파스텔 무드. 젠더 리빌 파티를 위한 특별한 셋업.',
    longDescription:
      '베이비샤워는 새로운 가족을 맞이하는 따뜻한 환영의 자리입니다. 파스텔과 내추럴 톤을 기반으로 부드럽고 사랑스러운 분위기를 만듭니다.',
    tags: ['젠더 리빌', '임신 축하', '신생아 파티'],
    highlights: [
      {
        title: '젠더 리빌 연출',
        description:
          '풍선 박스, 컨페티 풍선 등 다양한 리빌 방식 제안과 시뮬레이션.',
      },
      {
        title: '파스텔 컬러 무드',
        description:
          '사진에 자연스럽게 어우러지는 파스텔 톤의 라텍스·포일 풍선 조합.',
      },
      {
        title: '셀프 촬영 친화 셋업',
        description:
          '스튜디오·홈파티 모두 잘 어울리는 컴팩트하고 정돈된 백드롭 구성.',
      },
    ],
    color: 'bg-blanc-base',
    accent: 'bg-blanc-sand/30',
  },
  {
    slug: 'corporate',
    category: 'CORPORATE',
    label: 'Corporate',
    title: 'CORPORATE EVENTS',
    subtitle: '기업 & 행사',
    description:
      '브랜드 아이덴티티를 돋보이게 하는 프로페셔널 공간 연출. 론칭 쇼, 팝업스토어, VIP 행사.',
    longDescription:
      '브랜드의 메시지가 공간으로 전달되도록, 컬러·소재·구조를 통일감 있게 디자인합니다. 사전 답사부터 철수까지 행사 운영을 함께합니다.',
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
];

export function getServiceCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}
