<<<<<<< HEAD
const { SlashCommandBuilder} = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
=======
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
>>>>>>> c1703e6bab2201241faa5aaa9cd416f42267e247
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Loads songs from youtube")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("Loads a single song from a url")
                .addStringOption((option) => option.setName("url").setDescription("The song's url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("playlist")
                .setDescription("Loads a playlist of songs from a url")
                .addStringOption((option) => option.setName("url").setDescription("The playlist's url").setRequired(true))
<<<<<<< HEAD
         )
         .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("Searches for the song based on provided keywords")
                .addStringOption((option) => option.setName("searchterms").setDescription("The search keywords").setRequired(true)
         )
    ),
    run: async ({ client, interaction}) => {
        if(!interaction.member.voice.channel)
=======
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("search").setDescription("Searches for the song based on provided keywords")
                .addStringOption((option) => option.setName("searchterms").setDescription("The search keywords").setRequired(true)
                )
        ),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel)
>>>>>>> c1703e6bab2201241faa5aaa9cd416f42267e247
            return interaction.editReply("You need to be in a VC to use this command")

        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new EmbedBuilder()

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
<<<<<<< HEAD
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})
=======
>>>>>>> c1703e6bab2201241faa5aaa9cd416f42267e247

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` })

        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
<<<<<<< HEAD
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has been added to the Queue`)
                .setThumbnail(playlist.thumbnail)
=======
>>>>>>> c1703e6bab2201241faa5aaa9cd416f42267e247

            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has been added to the Queue`)
                .setThumbnail(playlist.thumbnail)

        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
<<<<<<< HEAD
            
=======

>>>>>>> c1703e6bab2201241faa5aaa9cd416f42267e247
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
<<<<<<< HEAD
                .setFooter({ text: `Duration: ${song.duration}`})
=======
                .setFooter({ text: `Duration: ${song.duration}` })
>>>>>>> c1703e6bab2201241faa5aaa9cd416f42267e247
        }
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
    },

}