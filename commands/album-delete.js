const Album = require('../models/album');

module.exports = {
    name: 'album-delete',
    /** @param {import('discord.js').Message} message */
    async execute(message, name) {
        if (!name) return await message.channel.send('Album name is required.');

        const album = await Album.findOne({ slug: name });

        if (!album) return await message.channel.send(`Album **${name}** does not exist.`);

        const channel = await message.client.channels.fetch(album.channelId);
        await channel.delete();

        await Album.deleteOne(album);
        message.client.albumChannels.delete(name);

        await message.channel.send(`Album **${name}** successfully deleted.`);
    },
};
