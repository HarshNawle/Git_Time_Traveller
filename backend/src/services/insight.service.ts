import { submitInsightFeedbackSchema } from "../validation/insight.js";


export interface InsightRecord {
    id: string;
    analysisResultId: string;
    repositoryId: string;
    path: string;
    title: string;
    summary: string;
    severity: "low" | "medium" | "high";
    metadata: unknown
}

export interface InsightPort {
    findByRepository(
        repositoryId: string
    ): Promise<InsightRecord[]>;

    submitFeedback(
        insightId: string,
        userId: string,
        vote: "up" | "down"
    ) : Promise<InsightRecord | null>;
}

export class InsightService {
    constructor(
        private readonly insightPort : InsightPort
    ) {}

    async getRepositoryInsights (
        repositoryId: string
    ) : Promise<InsightRecord[]> {
        return this.insightPort.findByRepository(
            repositoryId
        );
    }

    async submitFeedback(input: unknown) {
        const data = submitInsightFeedbackSchema.parse(input);

        // Authentication will be introduced later
        // For now userId is passed explicitly.

        throw new Error (
            "User authentication is required before submitting insight feedback"
        );
    }
}