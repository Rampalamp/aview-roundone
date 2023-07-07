export async function getRandomChuckNorrisJoke() {
    //next will cache the fetch, need to specify revalidate: 0 to make sure it doesnt just duplicate the initial returned joke.
    const result = await fetch("https://api.chucknorris.io/jokes/random", {
        next: { revalidate: 0 },
    });

    if (!result.ok) {
        throw new Error("Failed to fetch joke/data");
    }

    const returnedJoke = await result.json();

    return returnedJoke.value;
}

export async function getTranslations() {
    const result = await fetch("http://localhost:5000/languages");

    if (!result.ok) {
        throw new Error("Failed to fetch languages from libre.");
    }

    const returnedLanguages = await result.json();

    return returnedLanguages;
}

export async function translate(text: string, langCode: string) {
    const result = await fetch("http://localhost:5000/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: "en",
            target: langCode,
            format: "text",
        }),
        headers: { "Content-Type": "application/json" },
    });

    if (!result.ok) {
        throw new Error("Failed to translate using libre.");
    }

    const translatedText = await result.json();

    return translatedText;
}
