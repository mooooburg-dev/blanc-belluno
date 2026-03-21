import fs from "fs";
import path from "path";

export interface SiteSettings {
  instagram: string;
  kakaoChannel: string;
  naverBlog: string;
  phone: string;
  email: string;
  businessHours: string;
  brandDescription: string;
}

const defaultSettings: SiteSettings = {
  instagram: "blancbelluno",
  kakaoChannel: "@blancbelluno",
  naverBlog: "",
  phone: "",
  email: "",
  businessHours: "Mon - Fri / 10:00 - 18:00",
  brandDescription:
    "당신의 특별한 날을 더욱 빛나게.\n섬세한 감각으로 빚어내는 프리미엄 파티 스타일링.",
};

const SETTINGS_PATH = path.join(process.cwd(), "data", "settings.json");

function ensureSettingsFile() {
  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(SETTINGS_PATH)) {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2));
  }
}

export function getSettings(): SiteSettings {
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    // Vercel read-only 파일 시스템 또는 settings 파일 미존재 시 기본값 반환
    return { ...defaultSettings };
  }
}

export function updateSettings(
  updates: Partial<SiteSettings>
): SiteSettings {
  const current = getSettings();
  const updated = { ...current, ...updates };
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2));
  return updated;
}
