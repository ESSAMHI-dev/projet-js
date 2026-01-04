import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // App & Navigation
            title: "Expense Tracker",
            logout: "Logout",
            login: "Login",
            Dashboard: "Dashboard",
            Income: "Income",
            expense: "Expense",
            Factures: "Invoices",
            Profile: "Profile",
            
            // Auth Pages
            welcome_back: "Welcome Back",
            enter_details_login: "Please enter your details to login",
            email: "Email",
            enter_email: "Enter your email",
            password: "Password",
            min_8_characters: "min 8 Characters",
            no_account: "Don't have an account?",
            sign_up: "Sign Up",
            create_account: "Create an account",
            join_today: "Join us today by entering your details below.",
            full_name: "Full Name",
            enter_full_name: "Enter your full name",
            have_account: "Already have an account?",
            
            // Dashboard
            total_Balance: "Total Balance",
            total_income: "Total Income",
            total_expense: "Total Expense",
            recent_transactions: "Recent Transactions",
            see_more: "See More",
            financial_overview: "Financial Overview",
            expenses: "Expenses",
            incomes: "Incomes",
            Last_30_Days_Expenses: "Last 30 Days Expenses",
            Last_60_Days_Incomes: "Last 60 Days Incomes",
            
            // Income
            Income_Overview: "Income Overview",
            add_income: "Add Income",
            subtitle_income: "Track Your Earnings over time and analyze your income trends.",
            income_sources: "Income Sources",
            income_source: "Income Source",
            income_placeholder: "Freelance, Salary, etc.",
            
            // Expense
            expense_overview: "Expense Overview",
            add_expense: "Add Expense",
            subtitle_expense: "Track Your Expenses over time and analyze your spending trends.",
            expense_category: "Expense Category",
            category_placeholder: "Food, Transport, etc.",
            
            // Factures
            Factures_page: "Invoices Page",
            add_facture: "Add Invoice",
            
            // Common
            select_icon: "Select Icon",
            amount: "Amount",
            date: "Date",
            category: "Category",
            source: "Source",
            delete: "Delete",
            edit: "Edit",
            update: "Update",
            add: "Add",
            cancel: "Cancel",
            save: "Save",
            
            // Validation Messages
            enter_valid_email: "Please enter a valid email address.",
            password_min_length: "Password must be at least 8 characters long.",
            enter_password: "Please enter your password.",
            enter_full_name_error: "Please enter your full name.",
            something_wrong: "Something went wrong. Please try again.",
            
            // Success Messages
            expense_added: "Expense added successfully",
            expense_updated: "Expense updated successfully",
            expense_deleted: "Expense deleted successfully",
            income_added: "Income added successfully",
            income_updated: "Income updated successfully",
            income_deleted: "Income deleted successfully",
            facture_added: "Invoice added successfully",
            facture_updated: "Invoice updated successfully",
            facture_deleted: "Invoice deleted successfully",
            
            // Error Messages
            failed_add_expense: "Failed to add expense. Please try again.",
            failed_update_expense: "Failed to update expense. Please try again.",
            failed_delete_expense: "Failed to delete expense. Please try again.",
            failed_add_income: "Failed to add income. Please try again.",
            failed_update_income: "Failed to update income. Please try again.",
            failed_delete_income: "Failed to delete income. Please try again.",
            enter_category: "Please enter expense category",
            enter_valid_amount: "Please enter a valid amount",
            select_date: "Please select a date",
            enter_income_source: "Please enter income source",
        },
    },
    fr: {
        translation: {
            // App & Navigation
            title: "Suivi des Dépenses",
            logout: "Déconnexion",
            login: "Connexion",
            Dashboard: "Tableau de bord",
            Income: "Revenu",
            expense: "Dépense",
            Factures: "Factures",
            Profile: "Profil",
            
            // Auth Pages
            welcome_back: "Bon Retour",
            enter_details_login: "Veuillez entrer vos informations pour vous connecter",
            email: "Email",
            enter_email: "Entrez votre email",
            password: "Mot de passe",
            min_8_characters: "min 8 caractères",
            no_account: "Vous n'avez pas de compte ?",
            sign_up: "S'inscrire",
            create_account: "Créer un compte",
            join_today: "Rejoignez-nous aujourd'hui en entrant vos informations ci-dessous.",
            full_name: "Nom complet",
            enter_full_name: "Entrez votre nom complet",
            have_account: "Vous avez déjà un compte ?",
            
            // Dashboard
            total_Balance: "Solde Total",
            total_income: "Revenu Total",
            total_expense: "Dépense Totale",
            recent_transactions: "Transactions Récentes",
            see_more: "Voir Plus",
            financial_overview: "Aperçu Financier",
            expenses: "Dépenses",
            incomes: "Revenus",
            Last_30_Days_Expenses: "Dépenses des 30 Derniers Jours",
            Last_60_Days_Incomes: "Revenus des 60 Derniers Jours",
            
            // Income
            Income_Overview: "Aperçu des Revenus",
            add_income: "Ajouter un Revenu",
            subtitle_income: "Suivez vos gains au fil du temps et analysez vos tendances de revenus.",
            income_sources: "Sources de Revenus",
            income_source: "Source de Revenu",
            income_placeholder: "Freelance, Salaire, etc.",
            
            // Expense
            expense_overview: "Aperçu des Dépenses",
            add_expense: "Ajouter une Dépense",
            subtitle_expense: "Suivez vos dépenses au fil du temps et analysez vos tendances de dépenses.",
            expense_category: "Catégorie de Dépense",
            category_placeholder: "Nourriture, Transport, etc.",
            
            // Factures
            Factures_page: "Page des Factures",
            add_facture: "Ajouter une Facture",
            
            // Common
            select_icon: "Sélectionner une Icône",
            amount: "Montant",
            date: "Date",
            category: "Catégorie",
            source: "Source",
            delete: "Supprimer",
            edit: "Modifier",
            update: "Mettre à jour",
            add: "Ajouter",
            cancel: "Annuler",
            save: "Enregistrer",
            
            // Validation Messages
            enter_valid_email: "Veuillez entrer une adresse email valide.",
            password_min_length: "Le mot de passe doit contenir au moins 8 caractères.",
            enter_password: "Veuillez entrer votre mot de passe.",
            enter_full_name_error: "Veuillez entrer votre nom complet.",
            something_wrong: "Une erreur s'est produite. Veuillez réessayer.",
            
            // Success Messages
            expense_added: "Dépense ajoutée avec succès",
            expense_updated: "Dépense mise à jour avec succès",
            expense_deleted: "Dépense supprimée avec succès",
            income_added: "Revenu ajouté avec succès",
            income_updated: "Revenu mis à jour avec succès",
            income_deleted: "Revenu supprimé avec succès",
            facture_added: "Facture ajoutée avec succès",
            facture_updated: "Facture mise à jour avec succès",
            facture_deleted: "Facture supprimée avec succès",
            
            // Error Messages
            failed_add_expense: "Échec de l'ajout de la dépense. Veuillez réessayer.",
            failed_update_expense: "Échec de la mise à jour de la dépense. Veuillez réessayer.",
            failed_delete_expense: "Échec de la suppression de la dépense. Veuillez réessayer.",
            failed_add_income: "Échec de l'ajout du revenu. Veuillez réessayer.",
            failed_update_income: "Échec de la mise à jour du revenu. Veuillez réessayer.",
            failed_delete_income: "Échec de la suppression du revenu. Veuillez réessayer.",
            enter_category: "Veuillez entrer une catégorie de dépense",
            enter_valid_amount: "Veuillez entrer un montant valide",
            select_date: "Veuillez sélectionner une date",
            enter_income_source: "Veuillez entrer une source de revenu",
        },
    },
    ar: {
        translation: {
            // App & Navigation
            title: "متتبع النفقات",
            logout: "تسجيل الخروج",
            login: "تسجيل الدخول",
            Dashboard: "لوحة التحكم",
            Income: "الدخل",
            expense: "النفقات",
            Factures: "الفواتير",
            Profile: "الملف الشخصي",
            
            // Auth Pages
            welcome_back: "مرحبا بعودتك",
            enter_details_login: "يرجى إدخال بياناتك لتسجيل الدخول",
            email: "البريد الإلكتروني",
            enter_email: "أدخل بريدك الإلكتروني",
            password: "كلمة المرور",
            min_8_characters: "8 أحرف على الأقل",
            no_account: "ليس لديك حساب؟",
            sign_up: "إنشاء حساب",
            create_account: "إنشاء حساب",
            join_today: "انضم إلينا اليوم بإدخال بياناتك أدناه.",
            full_name: "الاسم الكامل",
            enter_full_name: "أدخل اسمك الكامل",
            have_account: "هل لديك حساب بالفعل؟",
            
            // Dashboard
            total_Balance: "الرصيد الإجمالي",
            total_income: "إجمالي الدخل",
            total_expense: "إجمالي النفقات",
            recent_transactions: "المعاملات الأخيرة",
            see_more: "عرض المزيد",
            financial_overview: "نظرة عامة على الشؤون المالية",
            expenses: "النفقات",
            incomes: "الدخل",
            Last_30_Days_Expenses: "نفقات آخر 30 يومًا",
            Last_60_Days_Incomes: "دخل آخر 60 يومًا",
            
            // Income
            Income_Overview: "نظرة عامة على الدخل",
            add_income: "إضافة دخل",
            subtitle_income: "تتبع أرباحك مع مرور الوقت وحلل اتجاهات دخلك.",
            income_sources: "مصادر الدخل",
            income_source: "مصدر الدخل",
            income_placeholder: "عمل حر، راتب، إلخ.",
            
            // Expense
            expense_overview: "نظرة عامة على النفقات",
            add_expense: "إضافة نفقات",
            subtitle_expense: "تتبع نفقاتك مع مرور الوقت وحلل اتجاهات إنفاقك.",
            expense_category: "فئة النفقات",
            category_placeholder: "طعام، نقل، إلخ.",
            
            // Factures
            Factures_page: "صفحة الفواتير",
            add_facture: "إضافة فاتورة",
            
            // Common
            select_icon: "اختر أيقونة",
            amount: "المبلغ",
            date: "التاريخ",
            category: "الفئة",
            source: "المصدر",
            delete: "حذف",
            edit: "تعديل",
            update: "تحديث",
            add: "إضافة",
            cancel: "إلغاء",
            save: "حفظ",
            
            // Validation Messages
            enter_valid_email: "يرجى إدخال عنوان بريد إلكتروني صالح.",
            password_min_length: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.",
            enter_password: "يرجى إدخال كلمة المرور الخاصة بك.",
            enter_full_name_error: "يرجى إدخال اسمك الكامل.",
            something_wrong: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
            
            // Success Messages
            expense_added: "تمت إضافة النفقات بنجاح",
            expense_updated: "تم تحديث النفقات بنجاح",
            expense_deleted: "تم حذف النفقات بنجاح",
            income_added: "تمت إضافة الدخل بنجاح",
            income_updated: "تم تحديث الدخل بنجاح",
            income_deleted: "تم حذف الدخل بنجاح",
            facture_added: "تمت إضافة الفاتورة بنجاح",
            facture_updated: "تم تحديث الفاتورة بنجاح",
            facture_deleted: "تم حذف الفاتورة بنجاح",
            
            // Error Messages
            failed_add_expense: "فشل إضافة النفقات. يرجى المحاولة مرة أخرى.",
            failed_update_expense: "فشل تحديث النفقات. يرجى المحاولة مرة أخرى.",
            failed_delete_expense: "فشل حذف النفقات. يرجى المحاولة مرة أخرى.",
            failed_add_income: "فشل إضافة الدخل. يرجى المحاولة مرة أخرى.",
            failed_update_income: "فشل تحديث الدخل. يرجى المحاولة مرة أخرى.",
            failed_delete_income: "فشل حذف الدخل. يرجى المحاولة مرة أخرى.",
            enter_category: "يرجى إدخال فئة النفقات",
            enter_valid_amount: "يرجى إدخال مبلغ صالح",
            select_date: "يرجى تحديد تاريخ",
            enter_income_source: "يرجى إدخال مصدر الدخل",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr', //langue par défaut
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;