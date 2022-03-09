import { ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";

export const loginApiHeader = [
  { name: "from", description: "", enum: ["web", "mobile", "cms"] },
];

export const fileApiHeader = {
  schema: {
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "binary",
      },
    },
  },
};

export const resetPasswordApiRes: ApiResponseOptions = {
  status: 200,
  schema: {
    oneOf: [
      {
        $ref: getSchemaPath(Boolean),
        description: "Only show if from type is `cms`",
        type: "boolean",
      },
      {
        type: "object",
        description: "Only show if from type is `mobile`",
        properties: {
          otpToken: { type: "string" },
          mobileNumber: { type: "string" },
        },
      },
    ],
  },
};