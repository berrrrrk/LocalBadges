import { FormSection, FormSwitch, FormText } from "@vendetta/ui/components/forms";
import { useState } from "react";

export default function Settings() {
    const [early, setEarly] = useState(false);
    const [hypesquad, setHypesquad] = useState(false);
    const [botdev, setBotdev] = useState(false);

    return (
        <FormSection title="Local Badges" description="Sadece senin profilinde görünecek rozetler">
            <FormSwitch
                label="Early Supporter"
                value={early}
                onValueChange={setEarly}
            />
            <FormSwitch
                label="HypeSquad"
                value={hypesquad}
                onValueChange={setHypesquad}
            />
            <FormSwitch
                label="Verified Bot Developer"
                value={botdev}
                onValueChange={setBotdev}
            />

            <FormText style={{ marginTop: 10, color: "#999" }}>
                Bu rozetler sadece senin client'ında görünür.
            </FormText>
        </FormSection>
    );
}
