import type { CollectionConfig } from "payload";

export const PromptTemplates: CollectionConfig = {
  slug: "prompt-templates",
  admin: {
    useAsTitle: "name"
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "feature",
      type: "select",
      options: [
        { label: "Supplier Check", value: "supplier_check" },
        { label: "Trade Translator", value: "trade_translator" },
        { label: "Supply Map", value: "supply_map" }
      ],
      required: true
    },
    {
      name: "systemPrompt",
      type: "textarea",
      required: true
    },
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true
    }
  ]
};
