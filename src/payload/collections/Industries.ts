import type { CollectionConfig } from "payload";

export const Industries: CollectionConfig = {
  slug: "industries",
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
      name: "slug",
      type: "text",
      required: true,
      unique: true
    },
    {
      name: "commonProducts",
      type: "array",
      fields: [
        {
          name: "product",
          type: "text",
          localized: true,
          required: true
        }
      ]
    }
  ]
};
