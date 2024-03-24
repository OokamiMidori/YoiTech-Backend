import { Request, Response } from "express";
import { ProfissionalLicenseBusiness } from "../business/ProfissionalLicenseBusiness";
import { BaseError } from "../errors/BaseError";

export class ProfissionalLicenseController{
    constructor(
        private profissionalLicenseBusiness:ProfissionalLicenseBusiness
    ){}

    public create = async (req: Request, res:Response) =>{
        try {
            const input = {
                token:req.headers.authorization,
                content:req.body.content
            }
            await this.profissionalLicenseBusiness.createProfissionalLicense(input)

            res.status(201).end() 

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public get = async (req:Request,res:Response) =>{
        try {
            const input={
                token:req.headers.authorization
            }

            const output = await this.profissionalLicenseBusiness.getProfissionalLicense(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public delete = async (req:Request, res:Response) =>{
        try {
            const input = {
                token:req.headers.authorization,
                idToDelete:req.params.id
            }

            await this.profissionalLicenseBusiness.deleteProfissionalLicense(input)

            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public edit = async (req:Request, res:Response)=>{
        try {
            const input = {
                token:req.headers.authorization,
                idToEdit:req.params.id,
                content:req.body.content
            }
            await this.profissionalLicenseBusiness.editProfissionalLicense(input)

            res.status(201).end()
            
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}