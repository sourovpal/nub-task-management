export interface HttpRequest {
    [key: string]: string | number;
}

export interface Pagination {
    from: number;
    to: number;
    current_page: number | null;
    next_page: number | null;
    prev_page: number | null;
    last_page: number | null;
    total: number;
}
