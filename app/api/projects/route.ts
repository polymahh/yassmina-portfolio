import { Client } from "@notionhq/client"

const notionSecret = process.env.NOTION_SECRET
const projectsDB = process.env.NOTION_DB_PROJECTS as string

const notion = new Client({auth:notionSecret})

export async function GET(req:Request){

    if(!notionSecret || !projectsDB){
        Response.json({  message: "missing secret or database id"}, {status : 500})
    }
    try {
        const query = await notion.databases.query({
            database_id:projectsDB
        })
        console.log(query)

        const structuredData  = query.results.map((project:any) => {

            const slideKeys = Object.keys(project?.properties).filter(key => key.includes("slide")).sort((a,b) => parseInt(a.split("slide")[1]) - parseInt(b.split("slide")[1]))
            const slides = slideKeys.map(key => project.properties[key]?.[project.properties[key].type][0]).filter(item => item != null )

            return {
                title : project?.properties?.title?.title[0]?.plain_text,
                location : project?.properties?.location?.rich_text[0]?.plain_text,
                preview : project?.properties?.preview?.files[0]?.file?.url,
                slides: slides
            }
        })
        return Response.json({data:structuredData,message:"projects"},{status:201})
    } catch (error) {
        return Response.json({  message: "something went wrong!"}, {status : 500})
    }

    
}