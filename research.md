# StitchFlow – Initial Problem Research

**Research Date:** 24 November 2026  
**Project:** StitchFlow  
**Domain:** Local Tailoring Business  
**Research Status:** Initial hypothesis – field visit completed, findings pending documentation

## 1. Problem Statement

1. Independent tailoring businesses need to manage multiple customer orders with different garment requirements and delivery commitments.
2. Keeping track of order progress and promised delivery dates may become difficult when several orders overlap.
3. Some small tailoring businesses may depend on physical notebooks, memory, or informal communication to organize their daily work.
4. Without a clear overview of pending work and available working capacity, prioritizing urgent orders may be challenging.
5. This project investigates whether a simple order and deadline management tool can help a local tailor organize their workflow.

*Note: These are initial assumptions that must be validated against the actual observations and interview findings.*

## 2. Intended User

**Target User:** Independent local tailor / tailoring shop owner.

**Shop Name:** Regent Tailor

**Location:** Near Durganagar Railway Station, Kolkata – 700028, West Bengal, India.

**Person Interviewed:** Shop Owner

**Role:** Owner

The objective is to understand how the owner currently records customer orders, tracks garment progress, manages delivery commitments, and prioritizes daily work.

## 3. Existing Solutions

### Solution 1: TailorPad

**Website:** https://tailorpad.com/

TailorPad is a tailoring and fashion-business management platform.

Its advertised features include:

- Customer profiles and measurement management.
- Flexible order booking.
- Work order management.
- Production workflow tracking.
- Fit sessions and alterations.
- Invoicing and reporting.

**Initial Comparison:**

TailorPad already provides several features relevant to tailoring businesses, making it a direct competitor.

For my intended user, I want to investigate whether its available features, pricing, onboarding requirements, and overall workflow are appropriate for the daily operations of a small independent tailoring business.

I will not assume that it is unsuitable without comparing its capabilities with the actual requirements of the tailor.

### Solution 2: Vyapar

**Website:** https://vyaparapp.in/

Vyapar is a business management and accounting application designed for small businesses.

Its advertised capabilities include:

- Customer and party management.
- Sales order tracking.
- Billing and invoicing.
- Inventory management.
- Payment reminders.
- Business reports.

**Initial Comparison:**

Vyapar offers general business and order management capabilities.

I want to investigate whether its workflow adequately addresses tailoring-specific requirements, such as garment-level progress tracking, measurements, fitting and alteration stages, and delivery prioritization.

The suitability of this solution depends on the actual workflow and requirements of the intended user.

## 4. Research Sources

### Source 1: TailorPad Official Website

**URL:** https://tailorpad.com/

Notes:

1. TailorPad provides customer profiles, measurement management, flexible order booking, and work order management.
2. It also advertises production tracking, fit sessions, alterations, invoicing, and business reports.
3. These capabilities provide a basis for comparing existing tailoring software with the requirements of an independent local tailor.

### Source 2: Vyapar Official Website

**URL:** https://vyaparapp.in/

Notes:

1. Vyapar provides billing, customer management, inventory, and sales order management.
2. Its order management features support tracking order statuses and managing open and partially delivered orders.
3. I will compare its general business workflow with the garment-specific requirements of the intended user.

## 5. Initial Project Hypothesis

A lightweight order management application could help an independent tailor maintain an organized record of customer orders, garment details, delivery commitments, and work progress.

A rule-based deadline-risk engine could additionally highlight orders that require attention based on remaining work and available working capacity.

The final features will be determined by the actual problem discovered during fieldwork.

## 6. Fieldwork

The initial fieldwork was conducted at Regent Tailor, near Durganagar Railway Station.

The investigation focused on:

- Understanding the existing order management process.
- Observing how customer orders and delivery dates are handled.
- Speaking directly with the shop owner.
- Understanding how pending and urgent orders are prioritized.
- Identifying operational difficulties that could potentially be addressed through a simple digital tool.

The detailed observations, interview responses, and collected data are documented separately in `fieldwork.md` and `data.csv`.

## 7. Expected Outcome

The objective is to develop a lightweight, practical tool based on a genuine operational problem identified at Regent Tailor.

The application will use Python, FastAPI, React, and TypeScript, with CSV-based data processing and an explainable rule-based deadline-risk engine.

**Current Status:** Initial research completed. Field visit conducted. Detailed findings and dataset documentation to be finalized.
