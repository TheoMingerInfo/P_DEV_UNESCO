import vine from '@vinejs/vine'
const siteValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(100),
        image_path: vine.string().minLength(5).maxLength(255),
        description: vine.string().minLength(10).maxLength(1000),
        register_date: vine.date(),
        longitude: vine.string().regex(/^\d{1,3}°\s?\d{1,2}'\s?\d{1,2}(\.\d+)?"\s?[EW]$/),
        latitude: vine.string().regex(/^\d{1,2}°\s?\d{1,2}'\s?\d{1,2}(\.\d+)?"\s?[NS]$/)
    })
)
// The longitude regex /^\d{1,3}°\s?\d{1,2}'\s?\d{1,2}(\.\d+)?"\s?[EW]$/ breaks down as: one to three digits 
// for degrees (\d{1,3}) followed by the degree symbol °, an optional space \s?, one to two digits 
// for minutes (\d{1,2}) and an apostrophe ', an optional space \s?, one to two digits for
//  seconds (\d{1,2}) optionally followed by a fractional part (\.\d+)?,
//  then a double-quote " and an optional space \s?,
//  and finally either E or W for east/west.
//  Example accepted format: 123° 45' 06.7" W.
//  The latitude regex restricts degrees to one or two digits (\d{1,2})
//  Example accepted format: 45°12'34.5"