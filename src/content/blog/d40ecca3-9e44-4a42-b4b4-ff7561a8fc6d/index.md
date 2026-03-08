---
title: "OpenUSD as the Single Source of Truth for Engineering Project Planning"
description: "How OpenUSD and NVIDIA Omniverse enable a unified, extensible approach to tying project management data to engineering models across complex multistakeholder projects."
date: "2025-03-08"
tags:
  - openusd
  - engineering
  - project_planning
  - omniverse
  - nvidia
---

When planning large scale engineering projects, project managers rely on a few sources of information:

<b>Engineering Drawings</b> show limited but detailed information about a specific system. They require specialized technical expertise to read and also rely on legacy nonextensible software like Solidworks which are prone to crashing and cannot show a holistic perspective of the project.

<b>Excel Sheets</b> that are passed from stakeholder to stakeholder, do not have a formal revision system, and describe in the language that the specific stakeholder understands but not necessarily other stakeholders.

<b>Project Experience</b>, where individuals who have either worked on the project since the beginning or worked on similar projects in the past, and are able to competently "fill in the gaps" and assess risks.

OpenUSD is an extensible file format that can encapsulate both 3D models and project specific data in an engineering hierarchy. Traditional CAD software structures engineering models in a part and assembly hierarchy, where subassemblies can be inherited into larger assemblies. The limitation of this system is custom project management information cannot be encoded into parts and assemblies, and that once an assembly becomes too large, it may take a PC hours to open it, if it does not crash.

The necessity to tie project management data to engineering models is driven by the sheer complexity of these projects and the difficulty in communicating across stakeholders. Being able to assign requirements to a specific part provides one source of truth tied to a unit of work, which streamlines all of this complexity.

OpenUSD enables companies to encode custom project administration data into prims that represent parts, subassemblies, and complete assemblies. The NVIDIA Omniverse ecosystem then enables custom extensions and user tools to be built to modify these prim properties. Additionally, NVIDIA Omniverse enables these large complex engineering models to be viewed, rendered, edited, and simulated on the GPU or across many GPUs. This leads to a more practical user experience when trying to view the entire project and get a holistic perspective on the design.

## Practical Example

A construction project requires 10 firms to collaborate together and schedule labour, material shipments, and timelines. This results in a minimum of 10 project managers with their own industry specific language for organizing data and speaking about their own requirements.

A software developer is able to import a complete engineering design of the project into NVIDIA Omniverse. They then develop an Omniverse Extension to assign stakeholders to specific engineering assemblies in the project.

When the stakeholders communicate, they can view the complete project, fly around, isolate sections, and filter by who is assigned to which task. This clarity enables them to constructively discuss their own scope on a 3D document that acts as the primary source of truth for the project.

When a stakeholder requests a new system to better represent their requirements, the software developer is able to build a new Omniverse extension or USD script that implements that behaviour.
