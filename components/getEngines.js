

export async function getEngines(ownkey){
    try {
        const apiKey =ownkey?ownkey: process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        const response = await fetch('https://api.openai.com/v1/engines', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Failed to fetch models');
            return null
        }
    
        const data = await response.json();
     return data
    } catch (error) {

       
        console.error('Error fetching models:', error.message);
        return null
       
    }
    
}