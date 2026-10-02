import { exportRequestSchema } from "../validation/export.js";

export interface ExportjobRecord {
    id: string;
    analysisJobId: string;
    format: "gif" | "webm";
    scope: "filtered" | "full";
    status: | "queued" | "processing" | "completed" | "failed" | "cancelled";
    storageKey: string | null;
}

export interface ExportPort {
    create(input: {
        analysisJobId: string;
        format: "gif" | "webm";
        scope: "filtered" | "full";
    }) : Promise<ExportjobRecord>;
}

export class ExportService {
    constructor(private readonly exportPort : ExportPort) {}

    async createExport(input: {
        analysisJobId: string;
        format: "gif" | "webm";
        scope: "filtered" | "full";
    }) {
        const data = exportRequestSchema.parse({
            format: input.format,
            scope: input.scope,
        });

        return this.exportPort.create({
            analysisJobId: input.analysisJobId,
            format: data.format,
            scope: data.scope,
        });
    }
}