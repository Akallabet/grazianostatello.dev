import React, { useEffect } from "react";

type ColourScheme = "light" | "dark";

interface UserPreferences {
  colourscheme: ColourScheme;
}

interface UserPreferencesContextValue extends UserPreferences {
  toggleColourScheme: () => void;
}

const defaultPreferences: UserPreferences = {
  colourscheme: "dark",
};

function useUserPreferencesData(): UserPreferencesContextValue {
  const [{ colourscheme }, setPreferences] =
    React.useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const preferences = window.localStorage.getItem("preferences");
    if (preferences) {
      setPreferences(JSON.parse(preferences));
    }
  }, [setPreferences]);

  function toggleColourScheme() {
    const newColourScheme = colourscheme === "light" ? "dark" : "light";
    setPreferences({ colourscheme: newColourScheme });
    window.localStorage.setItem(
      "preferences",
      JSON.stringify({ colourscheme: newColourScheme })
    );
  }

  return {
    colourscheme,
    toggleColourScheme,
  };
}

const UserPreferencesContext = React.createContext<UserPreferencesContextValue>(
  {
    ...defaultPreferences,
    toggleColourScheme: () => {},
  }
);

export function UserPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preferences = useUserPreferencesData();

  return (
    <UserPreferencesContext.Provider value={preferences}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences(): UserPreferencesContextValue {
  return React.useContext(UserPreferencesContext);
}
