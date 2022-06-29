export default interface SiteInfoResponse extends Record<string, string> {
    site_name: string;
    site_url: string;
    site_description: string;
}
