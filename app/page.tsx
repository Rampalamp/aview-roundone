"use client";
import Translator from "@/components/Translator";
import { getRandomChuckNorrisJoke, translate } from "@/utilities/DataFetcher";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
    //const initJoke = await getRandomChukNorrisJoke();
    const [isJokeLoading, setJokeLoading] = useState(false);
    const [joke, setJoke] = useState<string>();
    const [displayText, setDisplayText] = useState<string>();
    const [languageCode, setLanguageCode] = useState<string>("en");

    useEffect(() => {
        handleNewJoke();
    }, []);

    function handleNewJoke() {
        setJokeLoading(true);
        getRandomChuckNorrisJoke().then((data) => {
            setJoke(data);
            //if languageCode is en, just set right from data
            if (languageCode === "en") {
                setDisplayText(data);
                setJokeLoading(false);
            } else {
                //translate text if languageCode is anything but "en"
                translate(data, languageCode)
                    .then((text) => {
                        setDisplayText(text.translatedText);
                        setJokeLoading(false);
                    })
                    .catch((error) => console.log(error));
            }
        });
    }

    return (
        <main className="flex flex-col min-h-screen p-24 bg-gradient-to-r from-slate-900 to-sky-950 text-green-400">
            <div className="flex flex-col m-auto items-center space-y-5">
                <h2 className="text-2xl font-bold text-center">
                    Chuck Norris Joke RNG
                </h2>
                <Image
                    className="rounded-full"
                    src="/chucknorris.jpg"
                    width={250}
                    height={250}
                    alt="Chuck Norris"
                />
                <div className="text-center">
                    {isJokeLoading ? "Loading..." : displayText}
                </div>
                <div className="">
                    <button
                        className="bg-slate-500 shadow-lg rounded-full p-4"
                        onClick={handleNewJoke}
                    >
                        Get New Joke
                    </button>
                </div>
                {/**
                 * Normally if a component uses this many parameters I would likely consider refactoring to useContext. But this code challenge ended up marked as spam so I only had an evening to work on it.
                 */}
                <Translator
                    joke={joke}
                    languageCode={languageCode}
                    setDisplayText={setDisplayText}
                    setJokeLoading={setJokeLoading}
                    setLanguageCode={setLanguageCode}
                />
            </div>
        </main>
    );
}
