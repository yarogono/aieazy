export const s3BaseUrl = "https://aieazy.s3.ap-northeast-2.amazonaws.com";

export function s3Asset(path: string) {
  return `${s3BaseUrl}/${path.replace(/^\/+/, "")}`;
}

export const commonImages = {
  ogDefault: s3Asset("common/og-default.webp"),
  placeholder: s3Asset("common/placeholder.webp"),
};
