export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: { 
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    {title: "female", value: "female"},
                    {title: "male", value: "male"},
                    {title: "kids", value: "kids"}
                ],
            },
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { 
                source: "name",
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'array', 
            of: [{type: 'block'}]
        },
        {
            name: 'care',
            title: 'Care',
            type: 'array', 
            of: [{type: 'block'}]
        }
    ]
}
// {
//     name: 'details',
//     title: 'Details',
//     type: 'array', 
//     of: [{type: 'block'}]
// }