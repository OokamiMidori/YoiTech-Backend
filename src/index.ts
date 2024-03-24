import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { LineOfBusinessRouter } from './router/lineOfBusinessRouter'
import { FunctionPerformedRouter } from './router/functionPerformedRouter'
import { ProfissionalLicenseRouter } from './router/profissionalLicenseRouter'
import { UserAdressRouter } from './router/userAdressRouter'
import { DrivingLicenseTypeRouter } from './router/drivingLicenseTypeRouter'
import { UserDetailRouter } from './router/userDetailRouter'
import { UserJobRouter } from './router/userJobRouter'
import { UserMeasurimentDetailsRouter } from './router/userMeasurementRouter'
import { MoveDisponibilityRouter } from './router/moveDisponibilityRouter'
import { WorkHistoryRouter } from './router/workHistoryRouter'
import { UserImgRouter } from './router/userImgRouter'
import { CompanyRouter } from './router/companyRouter'
import { CompanyAdressRouter } from './router/companyAdressRouter'
import { CompanyLogoRouter } from './router/companyLogoRouter'
import { JobOpportunityRouter } from './router/jobOpportunityRouter'
import { JobApplicationRouter } from './router/jobApplicationRouter'
import { MessageRouter } from './router/messageRouter'
import { RatingCompanyRouter } from './router/ratingCompanyRouter'
import { SiteRatingRouter } from './router/siteRatingRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// aqui temos o uso da variável PORT
// ela vem como string e então convertemos para um número com Number()
// deixamos um valor de backup com || caso não exista a variável
app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})
app.use("/user", userRouter)
app.use("/line_of_business", LineOfBusinessRouter)
app.use("/function_performed", FunctionPerformedRouter)
app.use("/profissional_license", ProfissionalLicenseRouter)
app.use("/user_adress", UserAdressRouter)
app.use("/driving_license_type", DrivingLicenseTypeRouter)
app.use("/user_detail", UserDetailRouter)
app.use("/user_job", UserJobRouter)
app.use("/user_measuriment_details", UserMeasurimentDetailsRouter)
app.use("/move_disponibility", MoveDisponibilityRouter)
app.use("/work_history", WorkHistoryRouter)
app.use("/user_img", UserImgRouter)
app.use("/company", CompanyRouter)
app.use("/company_adress", CompanyAdressRouter)
app.use("/companyLogo", CompanyLogoRouter)
app.use("/jobOpportunity", JobOpportunityRouter)
app.use("/jobApplication", JobApplicationRouter)
app.use("/message", MessageRouter)
app.use("/ratingCompany", RatingCompanyRouter)
app.use("/site_rating", SiteRatingRouter)