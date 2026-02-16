// import { InstitutionNode } from "./organizationTree.types"

import { api } from "@/app/lib/api"
import { InstitutionNode } from "./hierarchy.types"

export async function fetchOrganizationTree(): Promise<InstitutionNode> {
  try {
     const res = await api.get("/organization/tree")
 
  return res.data
  } catch (error:any) {
   return error.response
  }
 
}
