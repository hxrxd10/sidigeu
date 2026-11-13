export type EnlacePaginacion = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginado<T> = {
    data: T[];
    links: EnlacePaginacion[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number | null;
    to: number | null;
    total: number;
};
