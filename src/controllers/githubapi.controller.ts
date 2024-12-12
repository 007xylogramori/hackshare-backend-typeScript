import { extractOwnerAndRepo } from "../utils/githubUrl";
import { Request , Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import axios from "axios";

const fetchCommits = asyncHandler(async (req: Request, res: Response) => {
  const  repoUrl  = req.query.repoUrl as string ;

  if (!repoUrl) {
    throw new ApiError(400, "Repository URL is required");
  }

  try {
    const { owner, repoName } = extractOwnerAndRepo(repoUrl);

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repoName}/commits`
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, response.data, "Commits fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, (error as Error)?.message ||"Something went wrong while fetching commits");
  }
});

const fetchPullRequests = asyncHandler(async (req: Request, res: Response) => {
  const  repoUrl  = req.query.repoUrl;

  if (!repoUrl) {
    throw new ApiError(400, "Repository URL is required");
  }

  try {
    const { owner, repoName } = extractOwnerAndRepo(repoUrl as string);

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repoName}/pulls`
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          response.data,
          "Pull requests fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      (error as Error)?.message ||
      "Something went wrong while fetching pull requests"
    );
  }
});

const fetchRepoStats = asyncHandler(async (req: Request, res: Response) => {
    const { repoUrl } = req.query;

    if (!repoUrl) {
        throw new ApiError(400, "Repository URL is required");
    }

    try {
        const { owner, repoName } = extractOwnerAndRepo(repoUrl as string);

        // Make all API calls concurrently
        const [
            repoInfo,
            branches,
            contributors,
            issues,
            pullRequests,
            commits
        ] = await Promise.all([
            axios.get(`https://api.github.com/repos/${owner}/${repoName}`),
            axios.get(`https://api.github.com/repos/${owner}/${repoName}/branches`),
            axios.get(`https://api.github.com/repos/${owner}/${repoName}/contributors`),
            axios.get(`https://api.github.com/repos/${owner}/${repoName}/issues`),
            axios.get(`https://api.github.com/repos/${owner}/${repoName}/pulls`),
            axios.get(`https://api.github.com/repos/${owner}/${repoName}/commits`)
        ]);

        const response = {
            repository: repoInfo.data,
            branches: branches.data,
            contributors: contributors.data,
            issues: issues.data,
            pullRequests: pullRequests.data,
            commits: commits.data
        };

        res.status(200).json(new ApiResponse(200, response, "Repository statistics fetched successfully"));
    } catch (error) {
        throw new ApiError(500, (error as Error)?.message || "Something went wrong while fetching repository statistics");
    }
});

export { fetchCommits, fetchPullRequests , fetchRepoStats };
