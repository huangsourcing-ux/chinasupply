import type { CollectionConfig } from "payload";

export const SupplyRegions: CollectionConfig = {
  slug: "supply-regions",
  admin: {
    useAsTitle: "name"
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "province",
      type: "text",
      required: true
    },
    {
      name: "city",
      type: "text",
      required: true
    },
    {
      name: "coordinates",
      type: "point"
    },
    {
      name: "industries",
      type: "relationship",
      relationTo: "industries",
      hasMany: true
    },
    {
      name: "mainProducts",
      type: "array",
      fields: [
        {
          name: "product",
          type: "text",
          localized: true,
          required: true
        }
      ]
    },
    {
      name: "supplierDensity",
      type: "select",
      options: ["low", "medium", "high"],
      defaultValue: "medium"
    },
    {
      name: "exportMaturity",
      type: "select",
      options: ["emerging", "mature", "advanced"],
      defaultValue: "mature"
    },
    {
      name: "description",
      type: "richText",
      localized: true
    }
  ]
};
