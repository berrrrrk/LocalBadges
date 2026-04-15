import { definePlugin } from "@vendetta/definePlugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

export default definePlugin({
    name: "LocalBadges",
    description: "Sadece sana görünen rozetler (Early Supporter, HypeSquad, Bot Dev)",
    authors: [{ name: "Sen", id: "0" }],

    start() {
        const BadgeList = findByProps("UserProfileBadgeList")?.UserProfileBadgeList;
        if (!BadgeList) return console.log("[LocalBadges] Badge component bulunamadı");

        this.unpatch = after("default", BadgeList, (args, res) => {
            const user = args[0]?.user;
            // Sadece kendi profilinde çalışsın (kendi Discord ID'ni yaz)
            if (!user || user.id !== "1063500528258138252") return res;

            const badges = res?.props?.badges || [];
            
            // İstediğin rozetleri buraya ekle
            badges.push(
                { id: "early", name: "Early Supporter", icon: "https://discord.com/assets/early_supporter.svg" },
                { id: "hypesquad", name: "HypeSquad", icon: "https://discord.com/assets/hypesquad_bravery.svg" },
                { id: "botdev", name: "Verified Bot Developer", icon: "https://discord.com/assets/verified_bot_dev.svg" }
                // Daha fazla rozet eklemek istersen buraya aynı formatta ekle
            );

            res.props.badges = badges;
            return res;
        });
    },

    stop() {
        this.unpatch?.();
    }
});
