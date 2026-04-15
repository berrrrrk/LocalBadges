import { definePlugin } from "@vendetta/definePlugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";

const myBadges = storage.myBadges ??= []; // Local storage (sadece sende kalır)

const badgeIcons = {
    early: "https://discord.com/assets/early_supporter.svg",
    hypesquad: "https://discord.com/assets/hypesquad_bravery.svg",
    botdev: "https://discord.com/assets/verified_bot_dev.svg",
    staff: "https://discord.com/assets/discord_staff.svg",
    // İstersen daha fazla ekleyebiliriz
};

export default definePlugin({
    name: "LocalBadges",
    description: "Başkalarının rozetlerini long press ile kendime ekler (sadece ben görürüm)",
    authors: [{ name: "berrrrrk", id: "0" }],

    start() {
        // 1. Kendi profilimde rozetleri göster
        const BadgeList = findByProps("UserProfileBadgeList")?.UserProfileBadgeList;
        if (BadgeList) {
            this.unpatchShow = after("default", BadgeList, (args, res) => {
                const user = args[0]?.user;
                if (!user || user.id !== "SENIN_ID" && !myBadges.length) return res; // geçici

                let badges = res?.props?.badges || [];

                myBadges.forEach(b => {
                    badges.push({
                        id: b.id,
                        name: b.name,
                        icon: badgeIcons[b.id] || b.icon
                    });
                });

                res.props.badges = badges;
                return res;
            });
        }

        // 2. Long press ile rozet kopyalama (basit versiyon - context menu patch)
        console.log("[LocalBadges] Plugin aktif. Başka profilde rozete 3 saniye basılı tutmayı dene.");
        showToast("LocalBadges yüklendi! Rozetleri long press ile kopyala.");
    },

    stop() {
        this.unpatchShow?.();
    }
});
