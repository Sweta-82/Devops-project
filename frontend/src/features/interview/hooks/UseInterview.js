import { useContext, useEffect } from "react"
import { InterviewContext } from "../Interview.context"
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById, generateResumePdf } from "../services/interview.api";
import { useParams } from "react-router";


export const useInterview=()=>{
    const { interviewId } = useParams();
    
    const context=useContext(InterviewContext);
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;
    const generateReport = async({jobDescription, selfDescription, resumeFile})=>{
        setLoading(true);
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
            console.log(response);
            return response.interviewReport;
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            console.log(response)
            return response.interviewReport;
        } catch (error) {
            console.error("Error fetching interview report:", error);
        } finally {
            setLoading(false);
        }
    };

    const getReports= async()=>{
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response?.interviewReports || []);
            console.log(response);
            return response.interviewReports;
        } catch (error) {
            console.error("Error fetching interview reports:", error);
        } finally {
            setLoading(false);
        }
    }


const getResumePdf = async (reportId) => {
        setLoading(true);
        try {
            const response = await generateResumePdf({ interviewReportId: reportId });
            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `resume_${reportId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating resume PDF:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
    
        if (interviewId) {
            getReportById(interviewId);
        }
    
    }, [interviewId]);
    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }
}