# Todos

## Setup

- [x] Integrate Shadcn ui
- [x] Choose Theme and test the theme
- [x] integrate dark mode
- [x] Choose Font

## Landing Page

- [ ] Learn css gird by doing
- [x] Complete Fixed transparent navbar
- [x] complete the landing Page, acternity ui components
- [x] make landing page completely responsive

## Auth

- [x] Choose Auth Providers/library
- [x] Choose google oAuth Scopes
- [ ] user Profile Button

## middleware

- [ ] Decide on all public and private route and protect private
- [ ] make redirection based on user status

## main app Shared Layout

- [x] complete Sidebar
- [x] integrate dark/light mode switch
- [ ] complete inforbar
- [ ] keep track of credits (consumed/total)

## Dashboard

- [ ] Design Dashboard Static Page

## Connections

- [ ] configure API access for all platforms
- [ ] Make Routes for all platforms integration with url
- [ ] use Webhooks to create entries in Dashboard
- [ ] use Webhooks to run the Cron Job to run the workflow

## Workflows

- [ ] Create a Workflow
- [ ] get all the Workflows
- [ ] Canvas to create workflow sequence

## Settings

- [ ] allow user to change their information image/name/email

## Billing

- [ ] allow user to upgrade to paid plans
- [ ] integrate stripe

## Architecture

- landing Page
- register/signin/oAuth=>(google,Github) Page
- Connections=> (configuring Apis, main Ui, route for each service integration, redirection/callback url, apis to create entries/Webhooks verfication)
- Workflows => (create workflow, react flow to create workflow sequence, testing of workflow, Cron job to run workflow, accounts integration if not already),
- settings => (populate from with email/name/pic, delete pic, upload new pic),
- billing => (remaining credits, upgrade to higher plans, stripe integration)

## problems

- [ ] refreshToken is not generating beccuase better url does not contain acces-type=offline
