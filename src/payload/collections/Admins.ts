import type { CollectionConfig } from "payload";

export const Admins: CollectionConfig = {
  slug: "admins",
  auth: true,
  admin: {
    useAsTitle: "email"
  },
  fields: [
    {
      name: "name",
      type: "text"
    },
    {
      name: "role",
      type: "select",
      defaultValue: "content_editor",
      options: [
        { label: "Super Admin", value: "super_admin" },
        { label: "Content Editor", value: "content_editor" },
        { label: "Data Reviewer", value: "data_reviewer" },
        { label: "Support", value: "support" }
      ],
      required: true
    }
  ]
};
