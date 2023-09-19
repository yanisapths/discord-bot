const { SlashCommandBuilder } = require("discord.js");
const {
    generateUniqueToken,
    buildVerificationLink,
} = require("../common/index.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("arise_soul_verify")
        .setDescription("Get a unique verification link"),

    async execute(interaction) {
        const userId = interaction.user.id;
        const member = interaction.member;
        const internalRole = member.roles.cache.find(
            (role) => role.name === "internal"
        );
        const ariseSoulRole = member.roles.cache.find(
            (role) => role.name === "Arise Soul"
        );
        const uniqueToken = generateUniqueToken(userId);
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        const expirationTimestamp = Math.floor(expirationTime.getTime() / 1000);

        const queryParams = {
            user_id: userId,
            expires: expirationTimestamp,
        };

        if (!internalRole) {
            await interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true,
            });
            return;
        }
        if (ariseSoulRole) {
            await interaction.reply({
                content: "You already have Arise Soul role.",
                ephemeral: true,
            });
            return;
        }

        const verificationLink = buildVerificationLink(
            uniqueToken,
            queryParams
        );
        await interaction.reply({
            content: `Here's your verification link: ${verificationLink}`,
            ephemeral: true,
        });
    },
};
