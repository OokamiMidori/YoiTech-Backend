"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./router/userRouter");
const lineOfBusinessRouter_1 = require("./router/lineOfBusinessRouter");
const functionPerformedRouter_1 = require("./router/functionPerformedRouter");
const profissionalLicenseRouter_1 = require("./router/profissionalLicenseRouter");
const userAdressRouter_1 = require("./router/userAdressRouter");
const drivingLicenseTypeRouter_1 = require("./router/drivingLicenseTypeRouter");
const userDetailRouter_1 = require("./router/userDetailRouter");
const userJobRouter_1 = require("./router/userJobRouter");
const userMeasurementRouter_1 = require("./router/userMeasurementRouter");
const moveDisponibilityRouter_1 = require("./router/moveDisponibilityRouter");
const workHistoryRouter_1 = require("./router/workHistoryRouter");
const userImgRouter_1 = require("./router/userImgRouter");
const companyRouter_1 = require("./router/companyRouter");
const companyAdressRouter_1 = require("./router/companyAdressRouter");
const companyLogoRouter_1 = require("./router/companyLogoRouter");
const jobOpportunityRouter_1 = require("./router/jobOpportunityRouter");
const jobApplicationRouter_1 = require("./router/jobApplicationRouter");
const messageRouter_1 = require("./router/messageRouter");
const ratingCompanyRouter_1 = require("./router/ratingCompanyRouter");
const siteRatingRouter_1 = require("./router/siteRatingRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// aqui temos o uso da variável PORT
// ela vem como string e então convertemos para um número com Number()
// deixamos um valor de backup com || caso não exista a variável
app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
app.use("/user", userRouter_1.userRouter);
app.use("/line_of_business", lineOfBusinessRouter_1.LineOfBusinessRouter);
app.use("/function_performed", functionPerformedRouter_1.FunctionPerformedRouter);
app.use("/profissional_license", profissionalLicenseRouter_1.ProfissionalLicenseRouter);
app.use("/user_adress", userAdressRouter_1.UserAdressRouter);
app.use("/driving_license_type", drivingLicenseTypeRouter_1.DrivingLicenseTypeRouter);
app.use("/user_detail", userDetailRouter_1.UserDetailRouter);
app.use("/user_job", userJobRouter_1.UserJobRouter);
app.use("/user_measuriment_details", userMeasurementRouter_1.UserMeasurimentDetailsRouter);
app.use("/move_disponibility", moveDisponibilityRouter_1.MoveDisponibilityRouter);
app.use("/work_history", workHistoryRouter_1.WorkHistoryRouter);
app.use("/user_img", userImgRouter_1.UserImgRouter);
app.use("/company", companyRouter_1.CompanyRouter);
app.use("/company_adress", companyAdressRouter_1.CompanyAdressRouter);
app.use("/companyLogo", companyLogoRouter_1.CompanyLogoRouter);
app.use("/jobOpportunity", jobOpportunityRouter_1.JobOpportunityRouter);
app.use("/jobApplication", jobApplicationRouter_1.JobApplicationRouter);
app.use("/message", messageRouter_1.MessageRouter);
app.use("/ratingCompany", ratingCompanyRouter_1.RatingCompanyRouter);
app.use("/site_rating", siteRatingRouter_1.SiteRatingRouter);
