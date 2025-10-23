export class ProjectUtil {
  static sanitizeProjectData(data: any): any {
    const sanitized: any = {};

    if (data.title) {
      sanitized.title = data.title.trim();
    }

    if (data.description) {
      sanitized.description = data.description.trim();
    }

    if (data.readme !== undefined) {
      sanitized.readme = data.readme?.trim() || null;
    }

    if (data.proposalFile !== undefined) {
      sanitized.proposalFile = data.proposalFile?.trim() || null;
    }

    if (data.whitePaper !== undefined) {
      sanitized.whitePaper = data.whitePaper?.trim() || null;
    }

    if (data.demoLink !== undefined) {
      sanitized.demoLink = data.demoLink?.trim() || null;
    }

    if (data.links !== undefined) {
      sanitized.links = data.links;
    }

    if (data.investmentStatus !== undefined) {
      sanitized.investmentStatus = data.investmentStatus;
    }

    if (data.isRegistered !== undefined) {
      sanitized.isRegistered = Boolean(data.isRegistered);
    }

    if (data.ownerId) {
      sanitized.ownerId = data.ownerId.trim();
    }

    return sanitized;
  }

  static validateProjectData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.title || data.title.length < 3) {
      errors.push("Title must be at least 3 characters long");
    }

    if (data.title && data.title.length > 500) {
      errors.push("Title must not exceed 500 characters");
    }

    if (!data.description || data.description.length < 10) {
      errors.push("Description must be at least 10 characters long");
    }

    if (data.investmentStatus) {
      const validStatuses = [
        "self-sponsored",
        "looking-for-first-sponsor",
        "looking-for-more-sponsors",
      ];
      if (!validStatuses.includes(data.investmentStatus)) {
        errors.push("Invalid investment status");
      }
    }

    if (data.demoLink && !this.validateUrl(data.demoLink)) {
      errors.push("Demo link must be a valid URL");
    }

    if (data.links) {
      if (data.links.github && !this.validateUrl(data.links.github)) {
        errors.push("GitHub link must be a valid URL");
      }
      if (data.links.linkedin && !this.validateUrl(data.links.linkedin)) {
        errors.push("LinkedIn link must be a valid URL");
      }
      if (data.links.website && !this.validateUrl(data.links.website)) {
        errors.push("Website link must be a valid URL");
      }
      if (data.links.demo && !this.validateUrl(data.links.demo)) {
        errors.push("Demo link must be a valid URL");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
