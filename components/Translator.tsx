"use client";
import { getTranslations, translate } from "@/utilities/DataFetcher";
import { useEffect, useState } from "react";

interface TranslatorProps {
    joke: string | undefined;
    languageCode: string;
    setDisplayText: React.Dispatch<React.SetStateAction<string | undefined>>;
    setJokeLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setLanguageCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function Translator({
    joke,
    languageCode,
    setDisplayText,
    setJokeLoading,
    setLanguageCode,
}: TranslatorProps) {
    const [isLoading, setLoading] = useState(false);
    const [libreExists, setLibreExists] = useState(true);
    const [translations, setTranslations] = useState<Map<string, string>>();

    useEffect(() => {
        getTranslationOptions();
    }, []);

    useEffect(() => {
        if (languageCode === "en") {
            setDisplayText(joke);
        } else {
            setJokeLoading(true);
            translate(joke!, languageCode!)
                .then((text) => {
                    setDisplayText(text.translatedText);
                    setJokeLoading(false);
                })
                .catch((error) => console.log(error));
        }
    }, [languageCode]);

    function getTranslationOptions() {
        setLoading(true);
        //this setup is assuming you are currently running libretranslate locally on port 5000.
        getTranslations()
            .then((languages) => {
                let nameToCodeMapping = new Map<string, string>();

                for (let i = 0; i < languages.length; i++) {
                    nameToCodeMapping.set(languages[i].name, languages[i].code);
                }

                setTranslations(nameToCodeMapping);
            })
            .catch((err) => {
                setLibreExists(false);
            });
    }

    function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setLanguageCode(event.target.value);
    }

    return libreExists ? (
        isLoading && translations !== undefined ? (
            <div className="flex items-center space-x-5">
                <span>Language: </span>
                <select
                    className="bg-slate-500 m-auto"
                    value={languageCode}
                    onChange={handleLanguageChange}
                >
                    {Array.from(translations).map(([name, code]) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        ) : (
            <div>Loading...</div>
        )
    ) : (
        <div>Local Libre Translate Server Call Failed...</div>
    );
}
