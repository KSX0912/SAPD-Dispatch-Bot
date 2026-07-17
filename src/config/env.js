const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const envSchema = z.object({
    TOKEN: z.string().min(1, 'TOKEN is required'),
    CLIENT_ID: z.string().min(1, 'CLIENT_ID is required'),
    GUILD_ID: z.string().min(1, 'GUILD_ID is required'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('\n❌ Invalid environment configuration:\n');

    parsed.error.issues.forEach((issue) => {
        console.error(`• ${issue.message}`);
    });

    process.exit(1);
}

module.exports = parsed.data;