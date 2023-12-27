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
            return {
                title : project?.properties?.title?.title[0]?.plain_text,
                location : project?.properties?.location?.rich_text[0]?.plain_text,
                image : project?.properties?.image?.files[0]?.file?.url,
            }
        })
            
        return Response.json({data:structuredData,message:"projects"},{status:201})
    } catch (error) {
        return Response.json({  message: "something went wrong!"}, {status : 500})
    }

    
}