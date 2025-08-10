export type CloudinaryResponse = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  folder?: string;
  original_filename?: string;
  access_mode?: string;
  etag?: string;
  api_key?: string;
}