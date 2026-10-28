import { createMetadataKey, LogicFn, metadata, MetadataReducer, SchemaPath, validate } from "@angular/forms/signals";

export const MIN_WORDS = createMetadataKey(MetadataReducer.max<number>());


export function minWords(path: SchemaPath<string>, minValue: number | LogicFn<string, number>, 
    when?: LogicFn<string, boolean>

) {
    metadata(path, MIN_WORDS, ctx => typeof minValue === 'number' 
        ? minValue 
        : minValue(ctx));

    validate(path, ctx => {
        const value = ctx.value();
        const threshold = typeof minValue === 'number' ? minValue : minValue(ctx);
        if (when && !when(ctx)) {
            return null;
        }

        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < threshold) {
            return {
                kind: 'min-words', 
                message: `Must have at least ${threshold} words, but got ${wordCount}`
            }
        }
        return null;
    })
}