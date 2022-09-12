export interface Prediction {
	id: string,
    version: string,
    urls: any;
    created_at: string;
    completed_at: string,
    status: "starting" | 'processing' | 'succeeded' | 'failed';
    input: {
		text: string,
		grid_size: 1
    },
    output: string[];
    error: string;
}
