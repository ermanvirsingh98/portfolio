// API utility functions for portfolio data management

export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

export async function saveData(
  endpoint: string,
  data: any,
  method: "POST" | "PUT" = "POST"
) {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error saving ${endpoint}:`, error);
    throw error;
  }
}

export async function deleteData(endpoint: string, id: string) {
  try {
    const response = await fetch(`/api/${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error);
    throw error;
  }
}

// Specific API functions for each section
export const api = {
  overview: {
    get: () => fetchData("overview"),
    save: (data: any) => saveData("overview", data),
    update: (data: any) => saveData("overview", data, "PUT"),
  },
  about: {
    get: () => fetchData("about"),
    save: (data: any) => saveData("about", data),
    update: (data: any) => saveData("about", data, "PUT"),
  },
  projects: {
    get: () => fetchData("projects"),
    save: (data: any) => saveData("projects", data),
    update: (id: string, data: any) => saveData(`projects/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("projects", id),
  },
  skills: {
    get: () => fetchData("skills"),
    save: (data: any) => saveData("skills", data),
    update: (id: string, data: any) => saveData(`skills/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("skills", id),
  },
  socialLinks: {
    get: () => fetchData("social-links"),
    save: (data: any) => saveData("social-links", data),
    update: (id: string, data: any) =>
      saveData(`social-links/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("social-links", id),
  },
  experiences: {
    get: () => fetchData("experiences"),
    save: (data: any) => saveData("experiences", data),
    update: (id: string, data: any) =>
      saveData(`experiences/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("experiences", id),
  },
  education: {
    get: () => fetchData("education"),
    save: (data: any) => saveData("education", data),
    update: (id: string, data: any) => saveData(`education/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("education", id),
  },
  awards: {
    get: () => fetchData("awards"),
    save: (data: any) => saveData("awards", data),
    update: (id: string, data: any) => saveData(`awards/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("awards", id),
  },
  certifications: {
    get: () => fetchData("certifications"),
    save: (data: any) => saveData("certifications", data),
    update: (id: string, data: any) =>
      saveData(`certifications/${id}`, data, "PUT"),
    delete: (id: string) => deleteData("certifications", id),
  },
  settings: {
    get: () => fetchData("settings"),
    save: (data: any) => saveData("settings", data),
    update: (data: any) => saveData("settings", data, "PUT"),
  },
};
