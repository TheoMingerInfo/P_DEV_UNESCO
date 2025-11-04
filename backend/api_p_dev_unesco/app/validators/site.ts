import vine from '@vinejs/vine'
const siteValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(100),
        image_path: vine.string().regex(/^[a-zA-Z0-9_\-\/\.]+\.(jpg|jpeg|png|gif|webp)$/i).minLength(5).maxLength(255),
        description: vine.string().minLength(10).maxLength(1000),
        register_date: vine.date(),
        longitude: vine.string().regex(/^\d{1,3}°\s?\d{1,2}'\s?\d{1,2}(\.\d+)?"\s?[EW]$/),
        latitude: vine.string().regex(/^\d{1,2}°\s?\d{1,2}'\s?\d{1,2}(\.\d+)?"\s?[NS]$/)
    })
)

// Example accepted format(longitude): 123° 45' 06.7" W.
// The latitude regex restricts degrees to one or two digits (\d{1,2})
// Example accepted format(latitude): 45°12'34.5"

export { siteValidator }