import { createLocalReq } from '../index.js';
import { jobAfterRead, jobsCollectionSlug } from './config/index.js';
import { runJobs } from './operations/runJobs/index.js';
import { updateJob, updateJobs } from './utilities/updateJob.js';
export const getJobsLocalAPI = (payload)=>({
        queue: async (args)=>{
            let queue = undefined;
            // If user specifies queue, use that
            if (args.queue) {
                queue = args.queue;
            } else if (args.workflow) {
                // Otherwise, if there is a workflow specified, and it has a default queue to use,
                // use that
                const workflow = payload.config.jobs?.workflows?.find(({ slug })=>slug === args.workflow);
                if (workflow?.queue) {
                    queue = workflow.queue;
                }
            }
            const data = {
                input: args.input
            };
            if (queue) {
                data.queue = queue;
            }
            if (args.waitUntil) {
                data.waitUntil = args.waitUntil?.toISOString();
            }
            if (args.workflow) {
                data.workflowSlug = args.workflow;
            }
            if (args.task) {
                data.taskSlug = args.task;
            }
            // Type assertion is still needed here
            if (payload?.config?.jobs?.depth || payload?.config?.jobs?.runHooks) {
                return await payload.create({
                    collection: jobsCollectionSlug,
                    data,
                    depth: payload.config.jobs.depth ?? 0,
                    req: args.req
                });
            } else {
                return jobAfterRead({
                    config: payload.config,
                    doc: await payload.db.create({
                        collection: jobsCollectionSlug,
                        data,
                        req: args.req
                    })
                });
            }
        },
        run: async (args)=>{
            const newReq = args?.req ?? await createLocalReq({}, payload);
            return await runJobs({
                limit: args?.limit,
                overrideAccess: args?.overrideAccess !== false,
                processingOrder: args?.processingOrder,
                queue: args?.queue,
                req: newReq,
                sequential: args?.sequential,
                where: args?.where
            });
        },
        runByID: async (args)=>{
            const newReq = args.req ?? await createLocalReq({}, payload);
            return await runJobs({
                id: args.id,
                overrideAccess: args.overrideAccess !== false,
                req: newReq
            });
        },
        cancel: async (args)=>{
            const newReq = args.req ?? await createLocalReq({}, payload);
            const and = [
                args.where,
                {
                    completedAt: {
                        exists: false
                    }
                },
                {
                    hasError: {
                        not_equals: true
                    }
                }
            ];
            if (args.queue) {
                and.push({
                    queue: {
                        equals: args.queue
                    }
                });
            }
            await updateJobs({
                data: {
                    completedAt: null,
                    error: {
                        cancelled: true
                    },
                    hasError: true,
                    processing: false,
                    waitUntil: null
                },
                depth: 0,
                disableTransaction: true,
                req: newReq,
                returning: false,
                where: {
                    and
                }
            });
        },
        cancelByID: async (args)=>{
            const newReq = args.req ?? await createLocalReq({}, payload);
            await updateJob({
                id: args.id,
                data: {
                    completedAt: null,
                    error: {
                        cancelled: true
                    },
                    hasError: true,
                    processing: false,
                    waitUntil: null
                },
                depth: 0,
                disableTransaction: true,
                req: newReq,
                returning: false
            });
        }
    });

//# sourceMappingURL=localAPI.js.map