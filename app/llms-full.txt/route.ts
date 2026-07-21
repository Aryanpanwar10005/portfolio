import { caseStudies } from '@/content/caseStudies';
import { blogPosts } from '@/content/blog';
import { playbook } from '@/content/playbook';

export const dynamic = 'force-static';

export async function GET() {
  let content = '# Aryan Panwar - Portfolio Content Markdown Dump\n\n';
  content += "> This file contains the core text of Aryan Panwar's portfolio, including all case studies, blog posts, and playbook entries. It is intended for ingestion by LLMs and AI search engines.\n\n";

  content += '## 1. Case Studies\n\n';
  for (const cs of caseStudies) {
    content += `### ${cs.title}\n`;
    content += `**Tagline:** ${cs.tagline}\n`;
    content += `**Role:** ${cs.role} | **Platform:** ${cs.platform} | **Timeline:** ${cs.timeline}\n\n`;
    if (cs.tldr && cs.tldr.length) {
      content += `#### TL;DR\n${cs.tldr.map(t => `- ${t}`).join('\n')}\n\n`;
    }
    content += `#### Overview\n${cs.sections.overview}\n\n`;
    content += `#### Problem Statement\n${cs.sections.problemStatement}\n\n`;
    content += `#### Market Need\n${cs.sections.marketNeed}\n\n`;
    content += `#### Target Users\n${cs.sections.targetUsers}\n\n`;
    content += `#### Research\n${cs.sections.research}\n\n`;
    if (cs.sections.insights.length) {
      content += `#### Insights\n${cs.sections.insights.map(i => `- ${i}`).join('\n')}\n\n`;
    }
    content += `#### Opportunity\n${cs.sections.opportunity}\n\n`;
    if (cs.sections.scope.length) {
      content += `#### Scope\n${cs.sections.scope.map(s => `- ${s}`).join('\n')}\n\n`;
    }
    if (cs.sections.outOfScope.length) {
      content += `#### Out of Scope\n${cs.sections.outOfScope.map(s => `- ${s}`).join('\n')}\n\n`;
    }
    content += `#### Final Solution\n${cs.sections.finalSolution}\n\n`;
    if (cs.sections.results) {
      content += `#### Results & Impact\n${cs.sections.results}\n\n`;
    }
    content += `#### Reflection\n${cs.sections.reflection}\n\n`;
    if (cs.sections.lessons.length) {
      content += `#### Lessons\n${cs.sections.lessons.map(l => `- ${l}`).join('\n')}\n\n`;
    }
    content += '---\n\n';
  }

  content += '## 2. Writing (Blog Posts)\n\n';
  for (const post of blogPosts) {
    content += `### ${post.title}\n`;
    content += `**Category:** ${post.category} | **Published:** ${post.publishedAt}\n`;
    content += `**Tags:** ${post.tags.join(', ')}\n\n`;
    content += `> ${post.summary}\n\n`;
    
    for (const section of post.sections) {
      content += `#### ${section.label}\n`;
      for (const block of section.body) {
        if (block.type === 'p') {
          content += `${block.text}\n\n`;
        } else if (block.type === 'quote') {
          content += `> ${block.text}\n\n`;
        } else if (block.type === 'list') {
          content += block.items.map((item: string) => `- ${item}`).join('\n') + '\n\n';
        }
      }
    }
    content += '---\n\n';
  }

  content += '## 3. Product Playbook\n\n';
  for (const entry of playbook) {
    content += `### ${entry.title} (${entry.project})\n`;
    content += `**When to use:** ${entry.whenToUse}\n\n`;
    content += `> ${entry.summary}\n\n`;
    content += `#### Steps\n`;
    content += entry.steps.map(s => `- ${s}`).join('\n') + '\n\n';
    if (entry.template) {
      content += `#### Template\n\`\`\`\n${entry.template}\n\`\`\`\n\n`;
    }
    content += '---\n\n';
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
}
