

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const dailyForecastSchema = {
    type: Type.OBJECT,
    properties: {
        forecast: { type: Type.STRING, description: "A 2-3 sentence personalized forecast in Turkish." },
    },
    required: ['forecast'],
};

const summarySchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A 2-4 sentence personalized summary in Turkish, weaving together the provided numerological insights." },
    },
    required: ['summary'],
};

const detailedInsightSchema = {
    type: Type.OBJECT,
    properties: {
        insight: {
            type: Type.STRING,
            description: "A 2-3 paragraph detailed insight in Turkish about the numerological number, its core meaning, and how it interacts with other key numbers in the chart, in the tone of an expert numerologist."
        },
    },
    required: ['insight'],
};


const generateAndParse = async <T>(prompt: string, schema: any): Promise<T | null> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const text = response.text;
        if (text) {
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson) as T;
        }
        return null;
    } catch (error) {
        console.error("Error generating or parsing Gemini response:", error);
        return null;
    }
};

export const generateDailyForecast = async (userName: string, lifePathNumber: number, personalDayNumber: number): Promise<string | null> => {
    const prompt = `
    Act as an expert numerologist. Create a personalized daily forecast for a user named ${userName}.
    Their core life theme is represented by their Life Path Number, which is ${lifePathNumber}.
    Today's specific energy for them is represented by their Personal Day Number, which is ${personalDayNumber}.

    Based on the interaction between their stable Life Path Number (${lifePathNumber}) and today's transient Personal Day Number (${personalDayNumber}), write a 2-3 sentence, positive, and insightful forecast in Turkish. It should be personal and encouraging.
    
    The output must be a JSON object matching the provided schema, with the forecast in the 'forecast' field.
    `;
    const result = await generateAndParse<{ forecast: string }>(prompt, dailyForecastSchema);
    return result ? result.forecast : null;
};

export const generatePersonalizedSummary = async (name: string, analysisType: string, keyInsights: string[]): Promise<string | null> => {
    const prompt = `
    Act as an expert numerologist. You are creating a personalized summary for a user named ${name}.
    The analysis type is: ${analysisType}.
    Here are the key insights discovered from their numerology chart:
    ${keyInsights.map(insight => `- ${insight}`).join('\n')}

    Please weave these points together into a cohesive, insightful, and encouraging summary of 2-4 sentences, written in Turkish. Address the user by their first name. The tone should be warm and empowering.
    
    The output must be a JSON object with the summary in the 'summary' field.
    `;
     const result = await generateAndParse<{ summary: string }>(prompt, summarySchema);
    return result ? result.summary : 'Analiziniz hazırlandı, özet yüklenemedi.';
}

export const generateDetailedInsight = async (
    userName: string,
    analysisType: string, // e.g., 'Kişisel Rapor' or 'Aşk Uyumu'
    numberType: string, // e.g., 'Yaşam Yolu Sayısı' or 'Kader Sayısı'
    numberValue: number,
    contextNumbers: { name: string, value: number }[] // e.g., [{name: 'Kader Sayısı', value: 5}]
): Promise<string | null> => {
    const contextPrompt = contextNumbers.map(cn => `${cn.name} (${cn.value})`).join(', ');
    const prompt = `
    Act as an expert numerologist. You are providing a detailed insight for ${userName} regarding their ${numberType}.
    The overall analysis type is "${analysisType}".
    Their ${numberType} is ${numberValue}.
    Other significant numbers in their chart include: ${contextPrompt}.

    Please write a 2-3 paragraph detailed analysis in Turkish. Explain the core meaning of ${numberValue} for their ${numberType}.
    Crucially, describe how this ${numberType}'s energy interacts with the other significant numbers mentioned, highlighting both supportive aspects and potential challenges within the context of a numerology chart.
    The tone should be insightful, empowering, and reflective of a seasoned numerologist.
    
    The output must be a JSON object with the detailed insight in the 'insight' field.
    `;
    const result = await generateAndParse<{ insight: string }>(prompt, detailedInsightSchema);
    return result ? result.insight : 'Detaylı bilgi yüklenemedi.';
};