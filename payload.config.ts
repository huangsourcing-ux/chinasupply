import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import path from "path";
import { Admins } from "./src/payload/collections/Admins";
import { Industries } from "./src/payload/collections/Industries";
import { Media } from "./src/payload/collections/Media";
import { PromptTemplates } from "./src/payload/collections/PromptTemplates";
import { SupplyRegions } from "./src/payload/collections/SupplyRegions";

export default buildConfig({
  admin: {
    user: Admins.slug
  },
  collections: [Admins, Media, Industries, SupplyRegions, PromptTemplates],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL
    }
  }),
  typescript: {
    outputFile: path.resolve(process.cwd(), "src/payload/payload-types.ts")
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), "src/payload/generated-schema.graphql")
  },
  plugins: [
    s3Storage({
      collections: {
        media: true
      },
      bucket: process.env.R2_BUCKET ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? ""
        },
        endpoint: process.env.R2_ACCOUNT_ID
          ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
          : undefined,
        forcePathStyle: true,
        region: "auto"
      }
    })
  ],
  upload: {
    limits: {
      fileSize: 10_000_000
    }
  },
  serverURL: process.env.NEXT_PUBLIC_APP_URL,
  telemetry: false,
  localization: {
    locales: ["en", "zh"],
    defaultLocale: "en"
  },
  sharp: undefined
});
